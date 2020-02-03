
const pkgJson = require('../package.json');
const sh = require('shelljs');
const DateFormat = require('fast-date-format');

const dateYDD =  new DateFormat('YYDDDD');
BASE_DIR=process.cwd();
const MERGED = false;

console.log("test>>");
if(!sh.which('git')){
  console.log("no git bash");
  process.exit(1);
}


commit()

function commit(){

  let currBranch = sh.exec('git symbolic-ref --short -q HEAD',{silent:true}).stdout;
  currBranch = currBranch.replace(/[\r\n]/g,"");
  console.log("Current Branch:"+currBranch);

  let stdout = sh.exec('git add .',{silent:true}).stdout;
  console.log(stdout);
  stdout = sh.exec(`git commit -m "${pkgJson.version}:auto commit" -a`,{silent:true}).stdout;
  console.log(stdout);
  if(stdout.indexOf('nothing to commit') != -1){
    return;
  }

  if(MERGED){
    let fetchCMD = 'git fetch origin ' +currBranch+':'+_tmp_branch;
    console.log("fetch>>>\n "+fetchCMD);
    stdout = sh.exec(fetchCMD,{silent:true}).stdout;
    console.log(stdout);

    stdout = sh.exec('git diff '+_tmp_branch,{silent:true}).stdout;
    console.log(stdout);
    stdout = sh.exec('git merge '+_tmp_branch,{silent:true}).stdout;
    console.log(stdout);
    stdout = sh.exec('git push',{silent:true}).stdout;
    console.log(stdout);
    stdout = sh.exec('git branch -d '+_tmp_branch,{silent:true}).stdout;
    console.log(stdout);
  }else{
    stdout = sh.exec('git pull',{silent:true}).stdout;
    console.log(stdout);
    stdout = sh.exec('git push',{silent:true}).stdout;
    console.log(stdout);
  }
}
