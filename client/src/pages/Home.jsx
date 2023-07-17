import StandardLayout from "../components/layout/StandardLayout";

import MainBanner from "../components/banners/MainBanner";
import StandardContainerGroup from "../components/containers/StandardContainerGroup";
import LinkGroup from "../components/links/LinkGroup";
import Footer from "../components/footer/Footer";

import StandardCarousel from "../components/carousel/StandardCarousel";

import img1 from "../images/tshirt1.jpg";
import img2 from "../images/tshirt2.jpg";
import img3 from "../images/tshirt3.jpg";
import img4 from "../images/tshirt4.jpg";

import mov1 from "../images/movies/spirited.png";
import mov2 from "../images/movies/slow-horses.jpg";
import mov3 from "../images/movies/emancipation.jpg";

const DATA = [
  {
    title: "iPhone SE",
    description: "Amazing experience",
    image: img1,
    style: "bg-gray-100",
  },
  {
    title: "iPad",
    description: "Lovable, Drawable",
    image: img2,
  },
  {
    title: "AirPods",
    description: "Rebuilt from the sound up ",
    image: img3,
  },
  {
    title: "iwatch",
    description: "A healthy leap ahead",
    image: img4,
    style: "bg-gray-100",
  },
];

const CARAOUSEL_DATA = [
  {
    image: mov1,
    imageAlt: "spirited",
  },
  {
    image: mov2,
    imageAlt: "slow-horses",
  },
  {
    image: mov3,
    imageAlt: "emancipation",
  },
];

function Home() {
  return (
    <StandardLayout>
      {/* 1) Main Banner   */}
      <MainBanner />

      {/* 2) Box Components */}
      <StandardContainerGroup data={DATA}/>
    
      {/* 3) Carousel */}
      <StandardCarousel data={CARAOUSEL_DATA} />

      {/* 4)Page Content  */}
       <div className="px-[200px] bg-gray-200"> 
       {/* 4.1) Main content */}
       <p className="py-5 text-sm text-gray-700">
        Aliquip fugiat proident officia aliquip deserunt exercitation labore
        aliquip reprehenderit esse ut eu aute nisi. Ea cillum ex ad adipisicing
        culpa labore nulla. Occaecat aliqua magna in quis dolor magna
        adipisicing. Sint anim nisi id dolor sint mollit est sit eiusmod dolore
        est officia. Cupidatat aute esse magna id consectetur amet aliqua
        consequat enim eiusmod. Enim velit ea ea veniam est. In ullamco
        exercitation deserunt veniam ut est dolor. Labore eiusmod consectetur et
        sit amet reprehenderit ea proident sunt nisi do minim. Ut excepteur
        irure dolor cillum eu esse laborum in do. Exercitation in quis sit ex
        amet. Reprehenderit anim eiusmod duis minim pariatur in anim voluptate
        consectetur ad officia nisi. Duis ex voluptate est reprehenderit. Aute
        nulla velit non fugiat. Sint ad nulla nulla amet do occaecat ea.
        Incididunt labore tempor adipisicing sit id pariatur quis ullamco do
        laboris esse fugiat consequat. Irure nisi culpa commodo deserunt ipsum
        laboris est dolor sit eu id labore. Aliqua est culpa exercitation
        aliquip irure id minim aliquip commodo. Incididunt aliqua cillum enim
        id. Proident anim exercitation dolor ipsum. Amet sit duis sit Lorem et
        dolor. Nisi consectetur do deserunt amet veniam incididunt ex tempor
        incididunt ut qui do ut sunt. Ullamco aliquip pariatur laboris nostrud
        ipsum excepteur culpa amet sunt dolor nisi. Tempor occaecat voluptate
        sunt est eiusmod est reprehenderit aliqua labore fugiat ea
        reprehenderit. Sint pariatur voluptate id est sint minim. Quis aute
        mollit velit amet. Ad ex labore id dolor officia do laboris. Ipsum do
        sit sit incididunt amet deserunt anim ex qui elit. Nisi incididunt
        eiusmod incididunt sunt esse elit aliquip velit laborum anim occaecat
        est. Tempor cupidatat nulla irure veniam aliqua nisi anim eiusmod ut
        pariatur irure adipisicing laboris. Sit minim dolore culpa dolor aliquip
        incididunt ipsum do dolore aute mollit voluptate.
      </p>
  
       {/* 4.2) Sub links */}

       <LinkGroup/>
       </div>
        
        
    </StandardLayout>
  );
}

export default Home;