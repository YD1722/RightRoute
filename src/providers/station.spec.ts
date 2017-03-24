import {Routes} from '../providers/routes';
import {Http} from "@angular/http";
let routes = null;
import {} from 'jasmine';

/*describe('Available root.ts makeData()', () => {

  it('should return', () => {
    beforeEach(() => {
      routes = new Routes();
    });

    let result = routes.getRoutes();

    expect(Array.isArray(result)).toBeTruthy;
    expect(result.length).toBeGreaterThan(0);
  });

});*/
describe('Seek Aarray left Functions testing', () => {

  it('should return a sub array from an array read from left to right\n' +
    '[a,b,c,d,e]=>[e,d,c]', () => {
    let a=[1,2,3,4,5,6,7,8];
    let b=[5,4,3];
    let c=['a','b','c','d','e'];
    let d=['e','d','c'];

    let seekArrayLeft=function(array:any[],a:number,b:number){
      //[1,2,3,4,5]  <-- a<b
      let result:any=[];
      for(let i=b;a<=i;i--){
        result.push(array[i]);
      }
      return result;
    }
    let result = seekArrayLeft(c,2,4);

    expect(Array.isArray(result)).toBeTruthy;
    expect(result).toEqual(d);
  });

});

describe('Seek Array right methods', () => {

  it('should return a sub array from an array read from right to left\n' +
    '[a,b,c,d,e]=>[b,c,d]', () => {
    let a=[1,2,3,4,5,6,7,8];
    let b=[3,4,5];

    let seekArrayLeft=function(array:any[],con:number,b:number){
      //[1,2,3,4,5]  <-- b<con
      let result:any=[];
      for(let i=b;con>=i;i++){
        result.push(array[i]);
      }
      return result;
    }
    let result = seekArrayLeft(a,4,2);

    expect(Array.isArray(result)).toBeTruthy;
    expect(result).toEqual(b);
  });

});


/*let a=[1,2,3];
 let b= [9,4,6];

 var c=a.filter(function(n) {
 return b.indexOf(n) !== -1;
 });
 console.log(c);*/


