 
export function random(len){
    let option= "asdADSFAAFabsnmfbandbfn133214t23y819";
    let length= option.length;
    let ans="";
    for(let i=0;i<length;i++){
        ans+=option[Math.floor((Math.random()*length))];

    }
    return ans;

}