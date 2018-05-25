import {Component, ElementRef, Renderer2, Input, ViewChild} from '@angular/core';

@Component({
	selector: 'tooltip',
	host: {
		'(mouseenter)': 'onMouseEnter([$event])',
		'(mouseleave)': 'onMouseLeave([$event])'
	},
	template: `
		<a>{{ TitleA }}</a>
		<div [ngClass]="{DivClass:true}" #divtooltip [style.top]="tooltipTop + 'px'" [style.left]="tooltipLeft + 'px'"></div>
	`,
	styles: [
        `
        .DivClass{
        	font-size:13px; font-family:Verdana;
			position:fixed;
			margin: 1%;
			z-index:9010;
			background: white;
			width:300px;
			box-shadow: rgba(0,0,0,0.5) 2px 5px 2px;

        }
        `
	]
})
export class TooltipComponent{
	@ViewChild('divtooltip') _divtooltip: ElementRef;

	@Input() TooltipText: string = "";
	@Input() TitleA: string = "";
	DivTooltipText: string="";
	screenWidth:number;
	screenHeight:number;
	tooltipWidth:number;
	tooltipHeight:number;
	tooltipTop:number=0;
	tooltipLeft:number=0;

    constructor(private element: ElementRef, private renderer: Renderer2){
        this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
    }
	
	onMouseEnter(event:any){
		/*Получаем размеры окна*/
		this.screenWidth=event["0"].view.innerWidth;
		this.screenHeight=event["0"].view.innerHeight;

		/*Пишем данные во вслывающее окно*/
		this.TooltipText=this.TooltipText.replace('<div>__localname__</div>\r\n','');
        this.element.nativeElement.childNodes[3].innerHTML=this.TooltipText;

        /*Пересчитываем всплывающее окно со значением внутри*/
        this.tooltipWidth=this._divtooltip.nativeElement.offsetWidth;
        this.tooltipHeight=this._divtooltip.nativeElement.offsetHeight;
        
		/*Считаем расположение всплывающего окна*/
        this.calcPosition(this.screenWidth, this.screenHeight, event["0"].clientX, event["0"].clientY, this.tooltipWidth, this.tooltipHeight);

	}

	calcPosition(sw:number, sh:number, mw:number, mh:number, tw:number, th:number){
		this.tooltipTop=((mh+th+10)>sh)?mh-th-10:mh;
		this.tooltipLeft=((mw+tw)>sw)?mw-tw-10:mw;
	}

	onMouseLeave(){
		/*Отчищаем div и входящую*/
        this.element.nativeElement.childNodes[3].innerHTML="";
		this.DivTooltipText="";
	}


}