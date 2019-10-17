const winW = window.innerWidth;
const winH = window.innerHeight;
//
// const w = 2800;
// const h = 900;

const w = winW;
const h = 1000;

const doMapping = (m, a, b, x, y) => {
    return (m*y-a*y+b*x-m*x)/(b-a);
};

const app = new PIXI.Application({ transparent: true, width: w, height: h, antialias:true, resolution:2});
document.body.appendChild(app.view);
// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
// PIXI.settings.RENDER_OPTIONS={antialias:true, resolution:2};
const container = new PIXI.Container();
app.stage.addChild(container);
const colorBlocks = new PIXI.Graphics();

const map = [];
let yTotal=100;

let title = new PIXI.Text('Index of Colors',{fontFamily : 'Work Sans', fontWeight: 600, fontSize:90, fill : 0x384e68, align : 'center'});
title.x=150;
title.y=40;
app.stage.addChild(title);
for (let i=0; i<countryData.length;i++){
    // each country shape
    // const country = PIXI.Sprite.from(`assets/${countryData[i].isoCode}.png`);
    let country = new PIXI.Text(countryData[i].country, {
                                     fontFamily: 'Work Sans',
                                     fontSize: doMapping(countryData[i].size,2180,3600950,8,100),
                                     fontWeight: 500,
                                     fill: 0x384e68,
                                     align:'center'});
    country.anchor.set(0);
    // country.scale.set(doMapping(countryData[i].size,2180,3600950,0.02,0.5));
    // country.x = doMapping(countryData[i].latLon[1],-102.553,174.886,150,w-150);
    // country.y = doMapping(countryData[i].latLon[0],-56.264,40.901,h-50, 200);
    country.x=100;
    if (i===0){
        country.y=yTotal
    }else{
        country.y=yTotal+doMapping(countryData[i-1].size,2180,3600950,8,112);
    }
    yTotal=country.y;
    // country.tint = 0x384e68;
    country.alpha = doMapping(countryData[i].objectCount, 1, 2616,0.4,0.9);
    country.speed = Math.random()*0.005;
    country.offset = Math.random()*10;
    country.interactive = true;
    country.buttonMode = true;
    country.name = countryData[i].country;
    country.on('pointerdown', onTouch);
    // each country's color blocks


    map.push(country);
    app.stage.addChild(country);

}

// const countryName = new PIXI.Text();
// app.stage.addChild(countryName);

function onTouch(){

    const objectList = countryData.find(e=>e.country===this.name).objectList;
    colorBlocks.clear();
    // const side = doMapping(objectList.length,1,2626,50,5);
    const side = 20;
    // console.log(side);
    const startX=450;
    const startY=250;
    let cX=startX;
    let cY=startY;
    const radius=12;
    const lineWidth=5;
    // const gapX=(w-400)/550;
    // const gapY=(h-400)/500;
    const gap=2*radius+12;
    // const nCol=Math.floor((w-500)/gap);
    // const nRow=Math.floor((h-200)/gap);
    // console.log(nCol,nRow);

    for (let i=0; i<objectList.length; i++){
        // const blockX = Math.random()*1000+(winW-1000)/2;
        // const blockY = Math.random()*800+(winH-800)/2;
        // colorBlocks.beginFill(parseInt(objectData[objectList[i]].colors[0],16));
        // colorBlocks.drawRect(blockX, blockY,3*side*objectData[objectList[i]].percents[0],side);
        // colorBlocks.endFill();
        // colorBlocks.beginFill(parseInt(objectData[objectList[i]].colors[1],16));
        // colorBlocks.drawRect(blockX+3*side*objectData[objectList[i]].percents[0], blockY,3*side*objectData[objectList[i]].percents[1],side);
        // colorBlocks.endFill();
        // colorBlocks.beginFill(parseInt(objectData[objectList[i]].colors[2],16));
        // colorBlocks.drawRect(blockX+3*side*objectData[objectList[i]].percents[0]+3*side*objectData[objectList[i]].percents[1], blockY,3*side*objectData[objectList[i]].percents[2],side);
        // colorBlocks.endFill();
        // colorBlocks.beginFill(parseInt(objectData[objectList[i]].colors[3],16));
        // colorBlocks.drawRect(blockX+3*side*objectData[objectList[i]].percents[0]+3*side*objectData[objectList[i]].percents[1]+3*side*objectData[objectList[i]].percents[2], blockY,3*side*objectData[objectList[i]].percents[3],side);
        // colorBlocks.endFill();
        cX=startX+(i%40)*gap;
        cY=startY+(Math.floor(i/60))*gap;
        // console.log(i%nCol,Math.floor(i/nRow));
        colorBlocks.lineStyle(lineWidth,parseInt(objectData[objectList[i]].colors[0],16),1);
        colorBlocks.arc(cX,cY,radius,0,PIXI.PI_2*objectData[objectList[i]].percents[0]);
        colorBlocks.lineStyle(lineWidth,parseInt(objectData[objectList[i]].colors[1],16),1);
        colorBlocks.arc(cX,cY,radius,PIXI.PI_2*objectData[objectList[i]].percents[0],PIXI.PI_2*objectData[objectList[i]].percents[0]+PIXI.PI_2*objectData[objectList[i]].percents[1])
        colorBlocks.lineStyle(lineWidth,parseInt(objectData[objectList[i]].colors[2],16),1);
        colorBlocks.arc(cX,cY,radius,PIXI.PI_2*objectData[objectList[i]].percents[0]+PIXI.PI_2*objectData[objectList[i]].percents[1],PIXI.PI_2*objectData[objectList[i]].percents[0]+PIXI.PI_2*objectData[objectList[i]].percents[1]+PIXI.PI_2*objectData[objectList[i]].percents[2])
        colorBlocks.lineStyle(lineWidth,parseInt(objectData[objectList[i]].colors[3],16),1);
        colorBlocks.arc(cX,cY,radius,PIXI.PI_2*objectData[objectList[i]].percents[0]+PIXI.PI_2*objectData[objectList[i]].percents[1]+PIXI.PI_2*objectData[objectList[i]].percents[2],PIXI.PI_2)
        colorBlocks.endHole();
        // colorBlocks.moveTo(0,0,0)
    }
    container.addChild(colorBlocks);
    // countryName.text = this.name;
    // countryName.x = 50;
    // countryName.y = 50;

};


let tick = 0;
app.ticker.add(()=>{
   for(let i=0; i<map.length;i++){
       const country = map[i];
       country.x += country.speed*Math.sin(tick + country.offset)*20;
       country.y += country.speed*Math.cos(tick + country.offset)*15;
       tick+=2*country.offset;
   }
});