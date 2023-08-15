class ApiFeature{
    constructor(querry, querryStr){
        this.querry = querry
        this.querryStr = querryStr
    }
    
    search(){
        const keyword = this.querryStr.keyword ? {
            name:{
                $regex: this.querry.keyword,
                $option: 'i'
            }
        }: {}
    }

}