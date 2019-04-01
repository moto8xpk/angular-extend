import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import Canvas2image from 'canvas2Image';

@Component({
  selector: 'app-htmltoimage',
  templateUrl: './htmltoimage.component.html',
  styleUrls: ['./htmltoimage.component.css']
})
export class HtmltoimageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(1);
  }

  captureScreen()
  {
    html2canvas(document.body).then(function(canvas) {
      var generatedImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      console.log(generatedImage);
      window.location.href=generatedImage;
    });
  }

}
