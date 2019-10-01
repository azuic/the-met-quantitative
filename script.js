const winW = window.innerWidth;
const winH = window.innerHeight;

const w = 2800;
const h = 900;

const doMapping = (m, a, b, x, y) => {
    return (m*y-a*y+b*x-m*x)/(b-a);
};

const app = new PIXI.Application({ transparent: true, width: w, height: h });
document.body.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);
const colorBlocks = new PIXI.Graphics();

const map = [];
for (let i=0; i<countryData.length;i++){
    // each country shape
    const country = PIXI.Sprite.from(`assets/${countryData[i].isoCode}.png`);
    country.anchor.set(0.5);
    country.scale.set(doMapping(countryData[i].size,2180,3600950,0.02,0.5));
    country.x = doMapping(countryData[i].latLon[1],-102.553,174.886,h/10,w-h/20);
    country.y = doMapping(countryData[i].latLon[0],-56.264,40.901,h/20, h/10*8);
    country.tint = 0x384e68;
    country.alpha = doMapping(countryData[i].objectCount, 1, 2616,0.1,1);
    country.speed = Math.random()*0.005;
    country.offset = Math.random()*1000;
    country.interactive = true;
    country.buttonMode = true;
    country.name = countryData[i].isoCode;
    country.on('pointerdown', onTouch);
    // each country's color blocks


    map.push(country);
    app.stage.addChild(country);

}

function onTouch(){
    //
    //
    const objectList = countryData.find(e=>e.isoCode===this.name).objectList;
    colorBlocks.clear();
    // const side = doMapping(objectList.length,1,2626,50,5);
    const side = 20;
    // console.log(side);
    for (let i=0; i<objectList.length; i++){
        const blockX = Math.random()*1000+(winW-1000)/2;
        const blockY = Math.random()*800+(winH-800)/2;
        colorBlocks.beginFill(parseInt(objectData[objectList[i]].colors[0],16));
        colorBlocks.drawRect(blockX, blockY,3*side*objectData[objectList[i]].percents[0],side);
        colorBlocks.endFill();
        colorBlocks.beginFill(parseInt(objectData[objectList[i]].colors[1],16));
        colorBlocks.drawRect(blockX+3*side*objectData[objectList[i]].percents[0], blockY,3*side*objectData[objectList[i]].percents[1],side);
        colorBlocks.endFill();
        colorBlocks.beginFill(parseInt(objectData[objectList[i]].colors[2],16));
        colorBlocks.drawRect(blockX+3*side*objectData[objectList[i]].percents[0]+3*side*objectData[objectList[i]].percents[1], blockY,3*side*objectData[objectList[i]].percents[2],side);
        colorBlocks.endFill();
        colorBlocks.beginFill(parseInt(objectData[objectList[i]].colors[3],16));
        colorBlocks.drawRect(blockX+3*side*objectData[objectList[i]].percents[0]+3*side*objectData[objectList[i]].percents[1]+3*side*objectData[objectList[i]].percents[2], blockY,3*side*objectData[objectList[i]].percents[3],side);
        colorBlocks.endFill();
    }
    container.addChild(colorBlocks);
};


let tick = 0;
app.ticker.add(()=>{
   for(let i=0; i<map.length;i++){
       const country = map[i];
       country.x += country.speed*Math.sin(tick + country.offset)*5;
       country.y += country.speed*Math.cos(tick + country.offset)*8;
       tick+=1;
   }
});