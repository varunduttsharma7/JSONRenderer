import { Component } from '@angular/core';
import { sample } from "./sample";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample';
  input: string;
  result: string = '';

  constructor() {

  }
  FillData() {
    this.input = sample;
  }

  RenderData(): void {
    document.getElementById("out").innerHTML = "";
    this.result = "<h3>Output: </h3><br>";
    let output: boolean = this.IsJsonString(this.input);

    if (output) {
      let data = JSON.parse(this.input);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          if (typeof (element) === "object") {
            if (Array.isArray(element)) {
              this.result += this.HandleArrayData(key,element);
            } else {
              this.result += this.HandleObjectData(key, element);
            }
          } else {
            this.result += this.HandlePrimaryData(key, element);
          }
        }
      }
    } else {
      this.result += `Please enter proper JSON data`;
    }
    document.getElementById("out").innerHTML = this.result;
  }

  
  HandlePrimaryData(key: string, element: any): string {
    let res = "";
    res = ` <div class="panel panel-default">
            <div class="panel-heading">${this.ConvertToReadable(key)} : ${element}  &nbsp&nbsp&nbsp // {key - value}</div>            
          </div>`;
    return res;
  }

  HandleObjectData(key, data: object): string {
    let res = `<div class="panel panel-default">
    <div class="panel-heading">${this.ConvertToReadable(key)} : // object { } </br>`;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (Array.isArray(element)) {
          res += this.HandleArrayData(key,element);
        }else if(typeof(element)==="object"){
          res+=this.HandleObjectData(key,element);
        }
         else {
          res += `${this.ConvertToReadable(key)} : ${element}</br>`;
        }
      }
    }
    res += ' </div></div>';
    return res
  }

  HandleArrayData(key,data: any[]) {
    let res = `
    <div class="panel panel-default">
              <div class="panel-heading">${this.ConvertToReadable(key)} : // array [ ]</br>
    <table><thead><tr>`;
    if (typeof data[0]==="string") {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
         res+=`${key} : ${element} <br>` ;
        }
      }
    } else {
    for (const key in data[0]) {
      console.log(typeof data[0]);
      res += `<td>${this.ConvertToReadable(key)}</td>`;
    }
    res += `</tr></thead>`;

    data.forEach(item => {
      res += '<tr>';
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          const element = item[key];
          res += "<td>";
          if (typeof (element) === "object") {
            if (Array.isArray(element)) {
              res += this.HandleArrayData(key,element);
            } else {
              res += this.HandleObjectData(key, element);
            }
          } else {
            res += `${element}`
          }
          res += "</td>";
        }
      }
      res += '</tr>';
    });
  }//end else 
    res += `</tbody></table></div></div>`;    
    return res;
  }


  IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  ConvertToReadable(data) {
    let text = data;
    let result = text.replace(/([A-Z])/g, " $1");
    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult
  }


}//ending tag
