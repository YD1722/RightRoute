import {} from 'jasmine';

describe('Available root.ts makeData()', () => {

  it('should return', () => {

    let seekArrayLeft=function(array:any[],a:number,b:number){
      //[1,2,3,4,5]  <-- a<b [con<--p1 / p2<--con]
      let result:any=[];
      for(let i=b;a<=i;i--){
        result.push(array[i]);
      }
      return result;
    };
    //expect(result).toEqual(expected);
    let seekArrayRight= function(array:string[],a:number,b:number){
      //[1,2,3,4,5] ---->  a<b [p1-->con / con-->p2]
      let result:any=[];
      for(let i=a;b>=i;i++){
        result.push(array[i]);
      }
      return result;
    };
    //============================================================
    //let result1= seekArrayRight(["a","b","c","d"],3,1);
    //expect(result1).toEqual(["b","c","d"]);
    //=================================================================
    let makeData= function(connected_route:any){
      let r1= connected_route.in_.path;
      let r2= connected_route.out_.path;
      let con= connected_route.con;
      let p1=connected_route.p1;
      let p2=connected_route.p2;

      let p1_ =r1.indexOf(p1);
      let p2_= r2.indexOf(p2);
      let c_p1= r1.indexOf(con);
      let c_p2= r2.indexOf(con);

      //expect(c_p1).toEqual(2);

      let r1_list:any;
      let r2_list:any=[];
      let con_list:any=[con];
      //case 1
      if(p1_<c_p1){
        r1_list=seekArrayRight(r1,p1_,c_p1,);
        //expect(r1_list).toEqual(["b","c","d"]);
      }else if(p1_>c_p1) {
        r1_list = seekArrayLeft(r1,c_p1, p1_);
      }
      //=============================
       //expect(r1_list).toEqual(["b","c"]);
      //====================================
      if(p2_<c_p2){
        r2_list=seekArrayLeft(r2,p2_,c_p2);
      }else if(p2_>c_p2){
        r2_list=seekArrayRight(r2,c_p2,p2_);
}

      return {
        r1_list:r1_list,
        con:con,
        r2_list:r2_list
      };
    };

    let connected_route={
      p1:"b", // start point
      p2:"y",  // end point
      in_:{
        path:["a","b","c","d"]
      },
      con:"c",
      out_:{
        path:["w","c","x","y","z"]
      }
    };

    let expected={
      r1_list:["b","c"],
      con:"c",
      r2_list:["c","x","y"]
    }
    let result = makeData(connected_route);

    expect(Array.isArray(result)).toBeTruthy;
    expect(result).toEqual(expected);
  });

});
