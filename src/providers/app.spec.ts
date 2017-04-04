import {} from 'jasmine';
import {AppService} from '../providers/app';

let app:any;

describe('chunkRoutePathArray', () => {
  beforeEach(() => {
    app=new AppService();
  });
  it('it should chunk a given array', () => {

    let mockList=[1,2,3,4,5,6,7];
    let ex_mockList=[[1,2,3],[4,5,6],[7]];
    let result = app.chunkList(mockList,3);

    expect(Array.isArray(result)).toBeTruthy;
    expect(result).toEqual(ex_mockList);
  });
})
