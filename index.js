import { Color, LineBasicMaterial, MeshBasicMaterial } from "three";
import { IfcViewerAPI } from "web-ifc-viewer";
import Drawing from "dxf-writer";
import { 
   IFCWALLSTANDARDCASE,
   IFCSLAB,
   IFCFURNISHINGELEMENT,
   IFCDOOR,
   IFCWINDOW,
   IFCPLATE,
   IFCMEMBER,
   IFCSPACE,
   IFCSTAIRFLIGHT,
   IFCRAILING,
   IFCCOVERING,
   
   
} from 'web-ifc';
 
// dodanie kamery oswietlenia sce ny siatki i osi układu // trzeba pamietać do poprawnych nazwach zmiennych 
const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff)});
viewer.axes.setAxes();
viewer.grid.setGrid(50, 50);
////////   to jest trzebne do check boxa usuwanie elementów //////
const scene = viewer.context.getScene();
////////////////////////////////////////////////
load();
let allPlans;
let model;
// funkcja do wczystywania BIM model
async function load() {
      model = await viewer.IFC.loadIfcUrl('./01.ifc');
     await viewer.shadowDropper.renderShadow(model.modelID)
     viewer.context.renderer.postProduction.active =   true;

     // info odnośnie projektu 
     const projectInfo = await viewer.IFC.getSpatialStructure(model.modelID)
     console.log(projectInfo );
     createTreeMenu(projectInfo);
     
   await viewer.plans.computeAllPlanViews(model.modelID);
   ////////   to jest potrzebne do check boxa usuwanie elementów //////
   model.removeFromParent();

   togglePickable(model, false);
// bez tego nic sie nie wyswietla
   await setupAllCategories();

   // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// flooor plan export

// floor plan navigation
   const lineMaterial = new LineBasicMaterial({color: 'black'})
   const baseMAterial = new MeshBasicMaterial ( {
      polygonOffset: true, 
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1
   })
   viewer.edges.create('example', model.modelID, lineMaterial, baseMAterial);

   const container = document.getElementById('button-container')
   const allPlans = viewer.plans.getAll(model.modelID);
   for(const plan of allPlans) {
      const currentPlan = viewer.plans.planLists[model.modelID][plan];
      console.log(currentPlan);

      const button = document.createElement('button');
      container.appendChild(button);
      button.textContent = currentPlan.name;
      button.onclick = () => {
         viewer.plans.goTo(model.modelID, plan);
         viewer.edges.toggle('example', true);
         togglePostproduction(false);
      };


   };
   const button = document.createElement('button');
   container.appendChild(button);
   button.textContent = 'Exit florplans'
   button.onclick = () => {
      viewer.plans.exitPlanView();
      viewer.edges.toggle('example', false);
      togglePostproduction(true);
   };


const project = await viewer.IFC.getSpatialStructure(model.modelID);
viewer.dxf.initializeJSDXF(Drawing);   


   const storeys = project.children[0].children[0].children;
   for(const storey of storeys) {
      for(const child of storey.children){
         if(child.children.length){
            storey.children.push(...child.children);
         };
      };
   };


for(const plan of allPlans) {
   const currentPlan = viewer.plans.planLists[model.modelID][plan];

   const button  = document.createElement('button');
   container.appendChild(button);
   button.textContent = 'Export' + currentPlan.name;
   button.onclick = () => {
      const storey = storeys.find(storey => storey.expressID === currentPlan.expressID)
      drawProjectedItems(storey, currentPlan, model.modelID );
   }
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// przeyciski do sterowania 
  
   const button1 = document.getElementById('selector1')
    button1.onclick = () => {
      const tabelainf1= document.getElementById('infoBtn1')
      tabelainf1.classList.toggle("conatiner2");
      const tabelainf2 = document.getElementById('infoBtn2')
      tabelainf2.classList.toggle("conatiner2");
      const tabelainf3 = document.getElementById('infoBtn3')
      tabelainf3.classList.toggle("conatiner2");
      const tabelainf4 = document.getElementById('infoBtn4')
      tabelainf4.classList.toggle("conatiner2");
      const tabelainf5 = document.getElementById('infoBtn5')
      tabelainf5.classList.toggle("conatiner2");
      const tabelainf6 = document.getElementById('infoBtn6')
      tabelainf6.classList.toggle("conatiner2");
      const tabela1 = document.getElementById('table-container')
      tabela1.classList.add("conatiner2");
      const tabela2 = document.getElementById('button-container')
        tabela2.classList.add("conatiner2");
        const tabela3 = document.querySelector('.ifc-tree-menu')
        tabela3.classList.add("conatiner2");
        const tabela4 = document.querySelector('.checboxes')
        tabela4.classList.add("conatiner2");
    }

    // panel 2 do listy elementów w exelu
   const infBtn1 = document.getElementById('infoBtn1')
   infBtn1.onclick = () => {
         const tabela1 = document.getElementById('table-container')
        const btn = document.getElementById('export')
        tabela1.classList.toggle("conatiner2");
        btn.classList.toggle("conatiner2");
        

    }






    const button2 = document.getElementById('selector2')
    button2.onclick = () => {
        const tabela2 = document.getElementById('button-container')
        tabela2.classList.toggle("conatiner2");
        const tabela1 = document.getElementById('table-container')
        tabela1.classList.add("conatiner2");
          const tabela3 = document.querySelector('.ifc-tree-menu')
          tabela3.classList.add("conatiner2");
          const tabela4 = document.querySelector('.checboxes')
          tabela4.classList.add("conatiner2");
          const tabelainf1= document.getElementById('infoBtn1')
          tabelainf1.classList.add("conatiner2");
          const tabelainf2 = document.getElementById('infoBtn2')
          tabelainf2.classList.add("conatiner2");
          const tabelainf3 = document.getElementById('infoBtn3')
          tabelainf3.classList.add("conatiner2");
          const tabelainf4 = document.getElementById('infoBtn4')
          tabelainf4.classList.add("conatiner2");
          const tabelainf5 = document.getElementById('infoBtn5')
          tabelainf5.classList.add("conatiner2");
          const tabelainf6 = document.getElementById('infoBtn6')
          tabelainf6.classList.add("conatiner2");
    }

    const button3 = document.getElementById('selector3')
    button3.onclick = () => {
        const tabela3 = document.querySelector('.ifc-tree-menu')
        tabela3.classList.toggle("conatiner2");
        const tabela1 = document.getElementById('table-container')
        tabela1.classList.add("conatiner2");
        const tabela2 = document.getElementById('button-container')
          tabela2.classList.add("conatiner2");
          const tabela4 = document.querySelector('.checboxes')
          tabela4.classList.add("conatiner2");
          const tabelainf1= document.getElementById('infoBtn1')
          tabelainf1.classList.add("conatiner2");
          const tabelainf2 = document.getElementById('infoBtn2')
          tabelainf2.classList.add("conatiner2");
          const tabelainf3 = document.getElementById('infoBtn3')
          tabelainf3.classList.add("conatiner2");
          const tabelainf4 = document.getElementById('infoBtn4')
          tabelainf4.classList.add("conatiner2");
          const tabelainf5 = document.getElementById('infoBtn5')
          tabelainf5.classList.add("conatiner2");
          const tabelainf6 = document.getElementById('infoBtn6')
          tabelainf6.classList.add("conatiner2");
    }
    const button6 = document.getElementById('selector6')
    button6.onclick = () => {
        const tabela4 = document.querySelector('.checboxes')
        tabela4.classList.toggle("conatiner2");
        const tabela1 = document.getElementById('table-container')
        tabela1.classList.add("conatiner2");
        const tabela2 = document.getElementById('button-container')
          tabela2.classList.add("conatiner2");
          const tabela3 = document.querySelector('.ifc-tree-menu')
          tabela3.classList.add("conatiner2");
          const tabelainf1= document.getElementById('infoBtn1')
          tabelainf1.classList.add("conatiner2");
          const tabelainf2 = document.getElementById('infoBtn2')
          tabelainf2.classList.add("conatiner2");
          const tabelainf3 = document.getElementById('infoBtn3')
          tabelainf3.classList.add("conatiner2");
          const tabelainf4 = document.getElementById('infoBtn4')
          tabelainf4.classList.add("conatiner2");
          const tabelainf5 = document.getElementById('infoBtn5')
          tabelainf5.classList.add("conatiner2");
          const tabelainf6 = document.getElementById('infoBtn6')
          tabelainf6.classList.add("conatiner2");
    }



    
    // dodawanie pomiaru dł i addnotacji

   const el = document.getElementById('body')
    const button4 = document.getElementById('selector4')
    button4.onclick = () => {
      let button5 = document.getElementById('selector5')
      button5.classList.remove("delate");
      changeCursor()
        el.classList.toggle("body");
        if (el.classList.value !== 'body') {
            viewer.dimensions.active = false;
           viewer.dimensions.previewActive = false;
        } else if (el.classList.value === 'body') {
         console.log('2')
        
            viewer.dimensions.active = true;
           viewer.dimensions.previewActive = true;
      
           window.ondblclick = ()=> {
            viewer.dimensions.create();
           }
      
           window.onkeydown = (event) => {
         if(event.code === 'Delete') {
            viewer.dimensions.delete();
            }
         }
    }
   }








// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Informacjon about element


const walls = await viewer.IFC.getAllItemsOfType(model.modelID, IFCWALLSTANDARDCASE, true);

const table = document.getElementById('walls-table');
const body = table.querySelector('tbody');
for(const wall of walls) {
    createWallNameEntry(body, wall);

    for(let propertyName in wall) {
        const propertyValue = wall[propertyName];
        addPropertyEntry(body, propertyName, propertyValue);
    }
}

// funkcaj pozwalająca na export do XLSX porzteby jest te scipt w html
const exportButton = document.getElementById('export');
exportButton.onclick = () => {
  const book = XLSX.utils.table_to_book(table);
  XLSX.writeFile(book, "Walls_Wable.xlsx")

};


// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// flooor plan export




function togglePostproduction(active) {
   viewer.context.renderer.postProduction.active =   true;
}

const dymmySubsetMaterial = new MeshBasicMaterial({visible: false})

async function  drawProjectedItems(storey, plan ,modelID){
   // create new drawing (if it dosent exist) 
   if(!viewer.dxf.drawings[plan.name]){ 
      viewer.dxf.newDrawing(plan.name);
   }
   const ids = storey.children.map(item => item.expressID);

   if(!ids.length) return;

   const subset = viewer.IFC.loader.ifcManager.createSubset({
      modelID,
      ids,
      removePrevious: true,
      customID: 'floor_plan_generation',
      material: dymmySubsetMaterial
   });

   const filteredPoints = [];
   const edges = await viewer.edgesProjector.projectEdges(subset);
   const positions = edges.geometry.attributes.position.array;

   const tolerance = 0.001;
   for(let i = 0; i < positions.length -5; i+=6) {

         const a = positions[i] - positions[ i + 3 ]
         // Z coords are multiplied by -1 to match DXF Y coordinate
		const b = -positions[i + 2] + positions[i + 5];

		const distance = Math.sqrt(a * a + b * b);

		if (distance > tolerance) {
			filteredPoints.push([positions[i], -positions[i + 2], positions[i + 3], -positions[i + 5]]);
		}

	}

   viewer.dxf.drawEdges(plan.name, filteredPoints, 'Projection', Drawing.ACI.BLUE, 'CONTINOUS');

   edges.geometry.dispose();

   viewer.dxf.drawNamedLayer(plan.name, plan, 'thick', 'Section', Drawing.ACI.RED, 'CONTINOUS');
   viewer.dxf.drawNamedLayer(plan.name, plan, 'thin', 'Section', Drawing.ACI.RED, 'CONTINOUS');

   const result = viewer.dxf.exportDXF(plan.name);
   const link = document.createElement('a')
   link.download = 'floorplan.dxf';
   link.href = URL.createObjectURL(result);
   document.body.appendChild(link);
   link.click();
   link.remove();

}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// system do mierzenia i i dodawania adnotacji 

// Spatial tree menu

function createTreeMenu(ifcProject) {
   const root = document.getElementById("tree-root");
   removeAllChildren(root);
   const ifcProjectNode = createNestedChild(root, ifcProject);
   ifcProject.children.forEach(child => {
       constructTreeMenuNode(ifcProjectNode, child);
   })
}

function nodeToString(node) {
   return `${node.type} - ${node.expressID}`
}

function constructTreeMenuNode(parent, node) {
   const children = node.children;
   if (children.length === 0) {
       createSimpleChild(parent, node);
       return;
   }
   const nodeElement = createNestedChild(parent, node);
   children.forEach(child => {
       constructTreeMenuNode(nodeElement, child);
   })
}

function createNestedChild(parent, node) {
   const content = nodeToString(node);
   const root = document.createElement('li');
   createTitle(root, content);
   const childrenContainer = document.createElement('ul');
   childrenContainer.classList.add("nested");
   root.appendChild(childrenContainer);
   parent.appendChild(root);
   return childrenContainer;
}

function createTitle(parent, content) {
   const title = document.createElement("span");
   title.classList.add("caret");
   title.onclick = () => {
       title.parentElement.querySelector(".nested").classList.toggle("active");
       title.classList.toggle("caret-down");
   }
   title.textContent = content;
   parent.appendChild(title);
}

function createSimpleChild(parent, node) {
   const content = nodeToString(node);
   const childNode = document.createElement('li');
   childNode.classList.add('leaf-node');
   childNode.textContent = content;
   parent.appendChild(childNode);

   childNode.onmouseenter = () => {
       viewer.IFC.selector.prepickIfcItemsByID(0, [node.expressID]);
   }

   childNode.onclick = async () => {
       viewer.IFC.selector.pickIfcItemsByID(0, [node.expressID]);
   }
}

function removeAllChildren(element) {
   while (element.firstChild) {
       element.removeChild(element.firstChild);
   }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Informacjon about element
//walls

function createWallNameEntry(table, wall) {
   const row = document.createElement('tr');
   table.appendChild(row);

   const wallName = document.createElement('td');
   wallName.colSpan = 2;
   wallName.textContent = 'Wall ' + wall.GlobalId.value;
   row.appendChild(wallName);
}

function addPropertyEntry(table, name, value) {
   const row = document.createElement('tr');
   table.appendChild(row);

   const propertyName = document.createElement('td');
   name = decodeIFCString(name);
   propertyName.textContent = name;
   row.appendChild(propertyName);

   if(value === null || value === undefined) value = "Unknown";
   if(value.value) value = value.value;
   value = decodeIFCString(value);

   const propertyValue = document.createElement('td');
   propertyValue.textContent = value;
   row.appendChild(propertyValue);
}

function decodeIFCString (ifcString) {
   const ifcUnicodeRegEx = /\\X2\\(.*?)\\X0\\/uig;
   let resultString = ifcString;
   let match = ifcUnicodeRegEx.exec (ifcString);
   while (match) {
       const unicodeChar = String.fromCharCode (parseInt (match[1], 16));
       resultString = resultString.replace (match[0], unicodeChar);
       match = ifcUnicodeRegEx.exec (ifcString);
   }
   return resultString;
}
}
                           /////////////////////////////////////////////////////////////////////////////














//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// funkcaj do usuwania elementów za pomocą dubble click 
let button5 = document.getElementById('selector5')
button5.onclick = () => {
   const el = document.getElementById('body')
   el.classList.remove("body");
   viewer.dimensions.active = false;
   viewer.dimensions.previewActive = false;
       button5.classList.toggle("delate");
         changeCursor();
   window.ondblclick = ()=> {
      button5 = document.getElementById('selector5')
         if (button5.classList.value !== 'delate') {
        console.log(button5.classList.value ) 
     } else if (button5.classList.value === 'delate') {
      const result = viewer.context.castRayIfc();
      console.log(result);
      if(result === null) return;

      const index = result.faceIndex;
      const subset = result.object;
      const id = viewer.IFC.loader.ifcManager.getExpressId(subset.geometry, index);
      viewer.IFC.loader.ifcManager.removeFromSubset(
      subset.modelID,
      [id],
      subset.userData.category
     );
     
     
         updatePostproduction()
   }
}
}
// zmiana kursora dla delate
const changeCursor = () => {
   if (button5.classList.value !== 'delate') {
      const el = document.getElementById('body')
      el.style.cursor = '';
   }else if (button5.classList.value === 'delate') {
      const el = document.getElementById('body')
      el.style.cursor = 'no-drop';
   }

}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// funkcja do usuwania elementów za pomocą chceck boxów 
// polega to na tym ze podnieniamy elementy


const categores = {
   IFCWALLSTANDARDCASE,
   IFCSLAB,
   IFCFURNISHINGELEMENT,
   IFCDOOR,
   IFCWINDOW,
   IFCPLATE,
   IFCMEMBER,
   // IFCSTAIRFLIGHT,
   // IFCRAILING,
   // IFCCOVERING,
}

function getName(category) {
   const names = Object.keys(categores);
   return names.find(name => categores[name] === category)
};

async function getAll(category){
   return viewer.IFC.loader.ifcManager.getAllItemsOfType(model.modelID, category);
}



const subsets =  {};

async function setupAllCategories () {
  const allCategories = Object.values(categores);
  for(const category of allCategories) {
      await  setupCategory(category);
  };
};

async function setupCategory(category) {
  const subset = await newSubsetOfType(category);
  subset.userData.category = category.toString();
  subsets[category] = subset;
  togglePickable(subset, true);
  setupCheckbox(category);

};

function setupCheckbox(category) {
  const name = getName(category);
  const checkbox = document.getElementById(name);
  checkbox.addEventListener('change', () => {

     viewer.context.renderer.postProduction.update()

     const subset = subsets[category];
     if(checkbox.checked) {
        scene.add(subset);
        togglePickable(subset, true);
     }
     else {
        subset.removeFromParent();
        togglePickable(subset, false);
     }
     updatePostproduction()
  });
};

function updatePostproduction() {
  viewer.context.renderer.postProduction.update();
}

async function newSubsetOfType(category) {
   const ids = await getAll(category);
   return viewer.IFC.loader.ifcManager.createSubset({
       modelID: model.modelID,
       scene, 
       ids, 
       removePrevious: true,
       customID: category.toString()
   })
}

function togglePickable(mesh, isPickable) {
  const pickableModels = viewer.context.items.pickableIfcModels;
  if(isPickable) {
     pickableModels.push(mesh);
  } else {
     const index = pickableModels.indexOf(mesh);
     pickableModels.splice(index, 1);
  };
}

// tu sie kończy 