import StandardContainer from "./StandardContainer";

function StandardContainerGroup({ data }) {
  return (
    <div className="grid grid-cols-2">
      {data.map((item, index) => (
        <StandardContainer
          key={index}
          title={item.title}
          description={item.description}
          image={item.image}
          style={item.style}
        />
      ))}
    </div>
  );
}

export default StandardContainerGroup;
