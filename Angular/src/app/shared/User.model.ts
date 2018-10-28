export class User{

    ID:number
    Name:string
    Email:string
    Address:string
    constructor(id:number,name:string,Email:string,Address:string)
    {
        this.ID=(id==0? null :id);
        this.Name=name;
        this.Email=Email;
        this.Address=Address;
    }
}