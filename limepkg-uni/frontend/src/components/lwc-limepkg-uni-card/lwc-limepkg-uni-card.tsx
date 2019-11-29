import {
    LimeWebComponent,
    LimeWebComponentContext,
    LimeWebComponentPlatform,
} from '@limetech/lime-web-components-interfaces';
import { Component, Element, h, Prop } from '@stencil/core';

@Component({
    tag: 'lwc-limepkg-uni-card',
    shadow: true,
    styleUrl: 'lwc-limepkg-uni-card.scss',
})
export class Card implements LimeWebComponent {
    @Prop()
    public platform: LimeWebComponentPlatform;

    @Prop()
    public context: LimeWebComponentContext;

    @Prop()
    public header: string;

    @Prop()
    public subTitle: string;

    @Prop()
    public postId: number;

    @Prop()
    public priority: string;

    @Prop()
    public clickHandler: Function; //Åtgärdas med @event()!

    @Element()
    public element: HTMLElement;

    private async handleClick() { // Emit event istället
        //console.log("HandleClick " + `${this.postId}`);
        let event = new CustomEvent("onClick", {
            detail: {
                title: this.header,
                subTitle: this.subTitle,
                value: this.postId,
                priority: this.priority
            }
        });
        this.clickHandler(event);
    }

    public render() {
        if (this.priority == "urgent") {
            return (
                <div class="urgent card" id={`${this.postId}`} onClick={this.handleClick.bind(this)}>
                    <h1>{this.header}</h1>
                    <h3>{this.subTitle}</h3>
                </div>
            ); 
        } else {
            return (
                <div class="card" id={`${this.postId}`} onClick={this.handleClick.bind(this)}>
                    <h1>{this.header}</h1>
                    <h3>{this.subTitle}</h3>
                </div>
            );
        }
    }
}
