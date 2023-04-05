import React, { Component } from 'react';
import {Color, Colors, colorToBackgroundColorClass, colorToBorderColorClass} from "../core/misc";

type Props = {
    size?: number
    selected: Color
    onChangeColor: (color: Color) => void
};

type State = {};

class ColorPicker extends Component<Props, State> {
    getTileSize() {
        if(this.props?.size === 8)
            return 'h-8 w-8'
        return 'h-4 w-4'
    }

    render() {
        return <div className="flex flex-col text-xs mt-3 ">
            <div className=" mb-1 font-bold">
                Color</div>
            <div className="flex items-center flex-grow">
                <div className="flex flex-row">{
                    Colors.map(x => {
                        return [
                            <div key={x} className="flex flex-col  mr-1">
                                <button onClick={() => this.props.onChangeColor(x)} title={x} className={"flex border " + this.getTileSize() + " " + colorToBackgroundColorClass(x) + " " + colorToBorderColorClass(x)} />
                                <div className="flex justify-center" >
                                    {(this.props.selected === x) ? <div>●</div> : null}
                                </div>
                            </div>
                        ]
                    })} </div>

            </div>
        </div>
    }
}

export default ColorPicker;
