import td1 from "../../images/User/tDesigns/t1.jpeg";
import td2 from "../../images/User/tDesigns/t2.jpeg";
import td3 from "../../images/User/tDesigns/t3.jpeg";
import td4 from "../../images/User/tDesigns/t4.jpeg";
import td5 from "../../images/User/tDesigns/t5.jpeg";
import td6 from "../../images/User/tDesigns/t6.jpeg";

const DATA = [
  {
    imaget: td1,
  },
  {
    imaget: td2,
  },
  {
    imaget: td3,
  },
  {
    imaget: td4,
  },
  {
    imaget: td5,
  },
  {
    imaget: td6,
  },
];

const chunks = [];
for (let i = 0; i < DATA.length; i += 3) {
  chunks.push(DATA.slice(i, i + 3)); // Divide the DATA array into chunks of three items
}

export default function DesCards() {
  return (
    <div className="flex flex-wrap justify-center">
      {chunks.map((chunk, index) => (
        <div key={index} className="flex justify-between w-[750px] ">
          {chunk.map((item, itemIndex) => (
            <div className="rounded-lg border p-[15px] w-[350px] h-[420px] space-x-[45px] mt-[45px] ml-[105px] bg-slate-600 shadow hover:shadow-lg hover:shadow-gray-800">
              <img
                key={itemIndex}
                src={item.imaget}
                alt="imaged"
                className="w-[350px] h-[350px] "
              />
              <div className="w-[350px] h-[350px] flex ">
                <button
                  type="button"
                  className="rounded border-2  w-[120px] h-[35px] mt-[10px] ml-[-25px]
                border-neutral-50 pb-[8px] pt-[6px] text-sm font-medium uppercase 
                text-white  shadow-lg shadow-slate-900 opacity-80"
                  
                >
                  Buy/details
                </button>
                <p className="text-white text-base mt-[15px] ml-[85px]">Rs:1300.00</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
