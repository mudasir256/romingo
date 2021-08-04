import ReadMore from "./ReadMore";

export default {
  title: "ReadMore",
  component: ReadMore,
};

const Template = (args) => <ReadMore {...args} />;

export const Default = Template.bind({});
Default.args = {
  text:
    "Retro meets contemporary here at our 1960’s mid-century modern art hotel. From the fully restored pool to the A-shaped entrance & exposed posts & beams, it’s the best of both worlds.\n\nTucson is magic. We’ll share that with you when you are here. The lobby is adorned with pieces created by Arizona artists. The beer we serve was brewed just down the street. The wine we pour comes from AZ wine country. The coffee we brew was roasted right here in Tucson.\n\nTrue to our roots, Hotel McCoy emphasizes function & affordability – offering fellow wanderers local style & high-end amenities at reachable rates. This is what we call Travel For All.",
  length: 230,
};
