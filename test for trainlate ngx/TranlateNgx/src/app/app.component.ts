import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TranlateNgx';
  param = { value: 'world' };
  list:any;
  lang1:string;

  constructor(private translate: TranslateService) {
    this.list=translate.getLangs();
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.lang1=translate.currentLang;
    console.log(translate.currentLang);
  }
  // changelanguage(para1:any){
  //   this.translate.use(para1.value);
  // }
}
