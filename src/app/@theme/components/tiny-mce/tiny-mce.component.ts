import { Component, OnDestroy, AfterViewInit, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'ngx-tiny-mce',
  template: '<p></p>',
})
export class TinyMCEComponent implements OnDestroy, AfterViewInit {

  @Output() editorKeyup = new EventEmitter<any>();

  editor: any;

  constructor(private host: ElementRef) { }

  ngAfterViewInit() {
      // alert("fghjk")
    tinymce.init({
      target: this.host.nativeElement,
      plugins: ['link', 'paste', 'table'],
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          this.editorKeyup.emit(editor.getContent());
        });
      },
      height: '320',
    });

  }

  ngOnDestroy() {
      // alert("remove");
    tinymce.remove(this.editor);
  }
}
