import { Product } from '../types';

const products: Product[] = [
  {
    id: 1,
    name: "Profesionální Úklidové Služby",
    price: 1500,
    shortDescription: "Kompletní úklidové služby pro domácnosti i firmy",
    description: "Naše profesionální úklidové služby zajistí dokonalou čistotu ve vašem domě nebo kanceláři. Nabízíme pravidelný i jednorázový úklid, mytí oken, čištění koberců a další specializované služby. Všichni naši pracovníci jsou řádně proškoleni a používají ekologické čisticí prostředky.",
    image: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg",
    category: "služby",
    inStock: true
  },
  {
    id: 2,
    name: "IT Konzultace",
    price: 2500,
    shortDescription: "Expertní poradenství v oblasti informačních technologií",
    description: "Poskytujeme odborné IT konzultace pro firmy všech velikostí. Naši specialisté vám pomohou s výběrem vhodného hardware a software, zabezpečením sítě, cloudovými řešeními a implementací nových technologií. Nabízíme také školení zaměstnanců a dlouhodobou technickou podporu.",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
    category: "konzultace",
    inStock: true
  },
  {
    id: 3,
    name: "Zahradnické Práce",
    price: 950,
    shortDescription: "Kompletní péče o vaši zahradu či firemní zeleň",
    description: "Naše zahradnické služby zahrnují vše od běžné údržby trávníku a živých plotů až po komplexní redesign celé zahrady. Zajistíme sekání trávy, stříhání keřů, výsadbu rostlin, instalaci zavlažovacích systémů a odborné ošetření stromů. Pracujeme s respektem k přírodě a používáme kvalitní nářadí a techniku.",
    image: "https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg",
    category: "služby",
    inStock: true
  }
];

export default products;