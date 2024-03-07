import { GuiText, GuiView } from "@uidu/native";
import { useEffect, useState } from "react";

const All = () => {

    console.log("all");

    const [isLoaded, setIsLoaded] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (!isLoaded &&
        <GuiView backgroundColor={"red"} >
            <GuiText>All</GuiText>
        </GuiView>)

}

export default All