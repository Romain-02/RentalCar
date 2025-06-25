import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ParamService {

  public mapToQueryParam(filters: Map<string, string>): string{
      if(filters.size === 0){
        return "";
      }

      let url: string = "?";

      for(let entry of filters.entries()){
        url +=  `${entry[0]}=${entry[1]}&`
      }

      return url.substring(0, url.length-1)
  }
}
