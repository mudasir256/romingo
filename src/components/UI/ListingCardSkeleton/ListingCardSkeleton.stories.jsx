import ListingCardSkeleton from "./ListingCardSkeleton";

export default {
  title: "ListingCardSkeleton",
  component: ListingCardSkeleton,
};

const Template = (args) => <ListingCardSkeleton {...args} />;

export const Default = Template.bind({});
Default.args = {};
