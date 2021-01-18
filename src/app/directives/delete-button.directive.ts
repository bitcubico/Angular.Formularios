import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDeleteButton]'
})
export class DeleteButtonDirective {
  value: string;

  constructor( private _elRef: ElementRef, private _renderer: Renderer2 ) { console.log('Directiva de DeleteButton') }

  @HostListener('mouseenter') mouseIn() {
    const elm = this._elRef.nativeElement;
    this.value = elm.value;
    this._renderer.removeClass(elm,'btn-outline-primary');
    this._renderer.addClass(elm,'btn-outline-danger');
    this._renderer.setAttribute(elm, 'value','Eliminar');
  }

  @HostListener('mouseleave') mouseOut() {
    const elm = this._elRef.nativeElement;
    
    this._renderer.removeClass(elm,'btn-outline-danger');
    this._renderer.addClass(elm,'btn-outline-primary');
    this._renderer.setAttribute(elm, 'value', this.value);
  }

}
