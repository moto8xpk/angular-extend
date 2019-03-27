# TranlateNgx

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

##Installation

First you need to install the npm module:

`npm install @ngx-translate/core --save`

##Usage
1. Import the TranslateModule:
Finally, you can use ngx-translate in your Angular project. You have to import TranslateModule.forRoot() in the root NgModule of your application.

The forRoot static method is a convention that provides and configures services at the same time. Make sure you only call this method in the root module of your application, most of the time called AppModule. This method allows you to configure the TranslateModule by specifying a loader, a parser and/or a missing translations handler.

`import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        BrowserModule,
        TranslateModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }`

#SharedModule
If you use a SharedModule that you import in multiple other feature modules, you can export the TranslateModule to make sure you don't have to import it in every module.

`@NgModule({
    exports: [
        CommonModule,
        TranslateModule
    ]
})
export class SharedModule { }`
Note: Never call a forRoot static method in the SharedModule. You might end up with different instances of the service in your injector tree. But you can use forChild if necessary.

##Configuration
By default, there is no loader available. You can add translations manually using setTranslation but it is better to use a loader. You can write your own loader, or import an existing one. For example you can use the TranslateHttpLoader that will load translations from files using HttpClient.

To use it, you need to install the http-loader package from @ngx-translate:

`npm install @ngx-translate/http-loader --save`

##AoT
If you want to configure a custom TranslateLoader while using AoT compilation or Ionic, you must use an exported function instead of an inline function.

`export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }`

##2. Init the TranslateService for your application:

`import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app',
    template: `
        <div>{{ 'HELLO' | translate:param }}</div>
    `
})
export class AppComponent {
    param = {value: 'world'};

    constructor(translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }
}`

create a directory src/assets/i18n/Local_id.json
ex: en.json
`{
    "HELLO": "hello {{value}}"
}`

You can also define your translations manually with setTranslation.

`translate.setTranslation('en', {
    HELLO: 'hello {{value}}'
});`
The TranslateParser understands nested JSON objects. This means that you can have a translation that looks like this:

`{
    "HOME": {
        "HELLO": "hello {{value}}"
    }
}`

###API
TranslateService
Properties:
`currentLang`: The lang currently used

`currentLoader`: An instance of the loader currently used (static loader by default)

`onLangChange`: An EventEmitter to listen to lang change events. A LangChangeEvent is an object with the properties lang: string & translations: any (an object containing your translations).

example:

`onLangChange.subscribe((event: LangChangeEvent) => {
  // do something
});`
`onTranslationChange`: An EventEmitter to listen to translation change events. A TranslationChangeEvent is an object with the properties lang: string & translations: any (an object containing your translations).

example:

`onTranslationChange.subscribe((event: TranslationChangeEvent) => {
  // do something
});`
`onDefaultLangChange`: An EventEmitter to listen to default lang change events. A DefaultLangChangeEvent is an object with the properties lang: string & translations: any (an object containing your translations).

example:

`onDefaultLangChange.subscribe((event: DefaultLangChangeEvent) => {
  // do something
});`
Methods:
`setDefaultLang(lang: string)`: Sets the default language to use as a fallback
`getDefaultLang()`: string: Gets the default language
`use(lang: string): Observable<any>`: Changes the lang currently used
`getTranslation(lang: string)`: Observable<any>: Gets an object of translations for a given language with the current loader
`setTranslation(lang: string, translations: Object, shouldMerge: boolean = false)`: Manually sets an object of translations for a given language, set shouldMerge to true if you want to append the translations instead of replacing them
`addLangs(langs: Array<string>)`: Add new langs to the list
`getLangs()`: Returns an array of currently available langs
`get(key: string|Array<string>, interpolateParams?: Object): Observable<string|Object>`: Gets the translated value of a key (or an array of keys) or the key if the value was not found
`stream(key: string|Array<string>, interpolateParams?: Object)`: Observable<string|Object>: Returns a stream of translated values of a key (or an array of keys) or the key if the value was not found. Without any onLangChange events this returns the same value as get but it will also emit new values whenever the used language changes.
`instant(key: string|Array<string>, interpolateParams?: Object)`: string|Object: Gets the instant translated value of a key (or an array of keys). /!\ This method is synchronous and the default file loader is asynchronous. You are responsible for knowing when your translations have been loaded and it is safe to use this method. If you are not sure then you should use the get method instead.
`set(key: string, value: string, lang?: string)`: Sets the translated value of a key
`reloadLang(lang: string): Observable<string|Object>`: Calls resetLang and retrieves the translations object for the current loader
`resetLang(lang: string)`: Removes the current translations for this lang. /!\ You will have to call use, reloadLang or getTranslation again to be able to get translations
`getBrowserLang(): string | undefined`: Returns the current browser lang if available, or undefined otherwise
`getBrowserCultureLang(): string | undefined`: Returns the current browser culture language name (e.g. "de-DE" if available, or undefined otherwise
Write & use your own loader
If you want to write your own loader, you need to create a class that implements TranslateLoader. The only required method is getTranslation that must return an Observable. If your loader is synchronous, just use Observable.of to create an observable from your static value.
