const getId=(req)=>{
    console.log(req.params)
    let id  =req.params.id.replace(':','');
    id = Number(id)
    console.log(id);
    return id;
}
export default getId;