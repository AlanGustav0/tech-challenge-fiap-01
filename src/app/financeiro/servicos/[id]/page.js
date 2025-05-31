import Services from "./services";

const PageServices = ({params}) => {
    const id = decodeURIComponent(params.id).split('=')[1]

    return <Services id={id}/>;
};

export default PageServices;