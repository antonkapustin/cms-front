import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  effect,
  inject,
  input,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[cellHost]',
  standalone: true,
})
export class CellHostDirective {
  component = input<any>();
  inputs = input<any>();

  private _viewContainerRef = inject(ViewContainerRef);

  constructor( private _cdr: ComponentFactoryResolver) {
    effect(() => {
      const componentFactory = this.component();
      const component: ComponentRef<any> =
        this._viewContainerRef.createComponent(componentFactory);

        if(this.inputs()) {
            Object.entries(this.inputs()).forEach(([key, value]) => {
                component.instance[key] = value;
            });
        }
    });
  }
}
