import React from "react";
import { IFieldInput }  from "../models";
import './Field.scss';


export default class Field extends React.Component<IFieldInput, {}> {

    public render(): JSX.Element {
        return (
            <input
                type="number"
                name={ this.props.name }
                className="field-input"
                min="0"
                onChange={ this.props.onChange } value={ this.props.value }>
            </input>
        );
    }

}
