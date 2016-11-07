﻿import * as React from 'react'
import { Combobox } from 'react-widgets'
import { PanelGroup, Panel, Tabs, Tab } from 'react-bootstrap'
import { FormGroup, FormControlStatic, ValueLine, ValueLineType, EntityLine, EntityCombo, EntityList, EntityRepeater } from '../../../../Framework/Signum.React/Scripts/Lines'
import { classes, Dic } from '../../../../Framework/Signum.React/Scripts/Globals'
import * as Finder from '../../../../Framework/Signum.React/Scripts/Finder'
import { QueryDescription, SubTokensOptions, QueryToken, filterOperations, OrderType, ColumnOptionsMode } from '../../../../Framework/Signum.React/Scripts/FindOptions'
import { getQueryNiceName, Binding, EntityDataValues, EntityKindValues } from '../../../../Framework/Signum.React/Scripts/Reflection'
import * as Navigator from '../../../../Framework/Signum.React/Scripts/Navigator'
import { TypeContext, FormGroupStyle } from '../../../../Framework/Signum.React/Scripts/TypeContext'
import Typeahead from '../../../../Framework/Signum.React/Scripts/Lines/Typeahead'
import QueryTokenBuilder from '../../../../Framework/Signum.React/Scripts/SearchControl/QueryTokenBuilder'
import { ModifiableEntity, JavascriptMessage, EntityControlMessage } from '../../../../Framework/Signum.React/Scripts/Signum.Entities'
import { QueryEntity } from '../../../../Framework/Signum.React/Scripts/Signum.Entities.Basics'
import { FilterOperation, PaginationMode } from '../../../../Framework/Signum.React/Scripts/Signum.Entities.DynamicQuery'
import SelectorModal from '../../../../Framework/Signum.React/Scripts/SelectorModal';
import * as DynamicTypeClient from '../DynamicTypeClient';
import { Validators, DynamicTypeDefinition, DynamicProperty } from '../DynamicTypeClient';
import ValueComponent from './ValueComponent';
import CSharpCodeMirror from '../../Codemirror/CSharpCodeMirror';

require("!style!css!./DynamicType.css");

export interface DynamicTypeDesignContext {
    refreshView: () => void;
}

interface DynamicTypeDefinitionComponentProps {
    definition: DynamicTypeDefinition;
    typeName: string;
    dc: DynamicTypeDesignContext;
}

export class DynamicTypeDefinitionComponent extends React.Component<DynamicTypeDefinitionComponentProps, void> {


    handleMultiColumnUniqueIndexChecked = () => {
        const def = this.props.definition;
        if (def.multiColumnUniqueIndex)
            def.multiColumnUniqueIndex = undefined;
        else
            def.multiColumnUniqueIndex = { fields: [""] };
        this.forceUpdate();
    }

    handlePropertyRemoved = (dp: DynamicProperty) => {
        var qfs = this.props.definition.queryFields;
        if (qfs && qfs.contains(dp.name))
            qfs.remove(dp.name);

        this.props.dc.refreshView();
    }

    render() {
        const def = this.props.definition;

        var propNames = def.properties.map(p => p.name);

        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <ValueComponent dc={this.props.dc} labelColumns={4} binding={Binding.create(def, d => d.entityKind)} type="string" defaultValue={null} options={EntityKindValues} />
                    </div>
                    <div className="col-sm-6">
                        <ValueComponent dc={this.props.dc} labelColumns={4} binding={Binding.create(def, d => d.entityData)} type="string" defaultValue={null} options={EntityDataValues} />
                    </div>
                </div>

                <Tabs defaultActiveKey="properties" id="DynamicTypeTabs">
                    <Tab eventKey="properties" title="Properties">
                        <PropertyRepeaterComponent dc={this.props.dc} properties={def.properties} onRemove={this.handlePropertyRemoved} />
                        <fieldset>
                            <legend><input type="checkbox" checked={!!def.multiColumnUniqueIndex} onChange={this.handleMultiColumnUniqueIndexChecked} /> Multi-column Unique Index</legend>

                            {def.multiColumnUniqueIndex &&
                                <div className="row">
                                    <div className="col-sm-6">
                                        <ComboBoxRepeaterComponent options={propNames} list={def.multiColumnUniqueIndex.fields} />
                                    </div>
                                    <div className="col-sm-6">
                                        <CSharpExpressionCodeMirror binding={Binding.create(def.multiColumnUniqueIndex, d => d.where)} title="Where" signature={"(" + this.props.typeName + "Entity e) =>"} />
                                    </div>
                                </div>}
                        </fieldset>

                        <fieldset>
                            <legend>ToString expression</legend>
                            <CSharpExpressionCodeMirror binding={Binding.create(def, d => d.toStringExpression)} signature={"(" + this.props.typeName + "Entity e) =>"} />
                        </fieldset>
                    </Tab>
                    <Tab eventKey="query" title="Query">
                        <ComboBoxRepeaterComponent options={["Id"].concat(propNames)} list={def.queryFields} />
                    </Tab>

                    <Tab eventKey="operations" title="Operations">
                        <fieldset>
                            <legend><input type="checkbox" checked={!!def.operationConstruct} onChange={this.handleOperationConstructChecked} /> Create</legend>
                            {def.operationConstruct &&
                                <CSharpExpressionCodeMirror binding={Binding.create(def.operationConstruct, d => d.construct)} signature={"(object[] args) =>"} />
                            }
                        </fieldset>

                        <fieldset>
                            <legend><input type="checkbox" checked={!!def.operationExecute} onChange={this.handleOperationSaveChecked} /> Save</legend>
                            {def.operationExecute &&
                                <div>
                                <CSharpExpressionCodeMirror binding={Binding.create(def.operationExecute, d => d.canExecute)} title="CanSave" signature={"string (" + this.props.typeName + "Entity e) =>"} />
                                <CSharpExpressionCodeMirror binding={Binding.create(def.operationExecute, d => d.execute)} title="OperationSave" signature={"(" + this.props.typeName + "Entity e, object[] args) =>"} />
                                </div>
                            }
                        </fieldset>

                        <fieldset>
                            <legend><input type="checkbox" checked={!!def.operationDelete} onChange={this.handleOperationDeleteChecked} /> Delete</legend>
                            {def.operationDelete &&
                                <div>
                                <CSharpExpressionCodeMirror binding={Binding.create(def.operationDelete, d => d.canDelete)} title="CanDelete" signature={"string (" + this.props.typeName + "Entity e) =>"} />
                                <CSharpExpressionCodeMirror binding={Binding.create(def.operationDelete, d => d.delete)} title="OperationDelete" signature={"(" + this.props.typeName + "Entity e, object[] args) =>"} />
                                </div>
                            }
                        </fieldset>
                    </Tab>
                </Tabs>
            </div>
        );
    }

    handleOperationConstructChecked = () => {
        const def = this.props.definition;
        if (def.operationConstruct)
            def.operationConstruct = undefined;
        else
            def.operationConstruct = {
                construct:
                    "return new " + this.props.typeName + "Entity\r\n{\r\n" +
                    this.props.definition.properties.map(p => "    " + p.name + " = null").join(", \r\n") +
                    "\r\n};" };
        this.forceUpdate();
    }

    handleOperationSaveChecked = () => {
        const def = this.props.definition;
        if (def.operationExecute)
            def.operationExecute = undefined;
        else
            def.operationExecute = { execute: "e.Save();" };
        this.forceUpdate();
    }

    handleOperationDeleteChecked = () => {
        const def = this.props.definition;
        if (def.operationDelete)
            def.operationDelete = undefined;
        else
            def.operationDelete = { delete: "e.Delete();" };
        this.forceUpdate();
    }
}

export interface CSharpExpressionCodeMirrorProps {
    binding: Binding<string | undefined>;
    title?: string;
    signature?: string;
}

export class CSharpExpressionCodeMirror extends React.Component<CSharpExpressionCodeMirrorProps, void>{

    render() {
        let val = this.props.binding.getValue();

        return (
            <div>
                <h5><strong>{this.props.title || ""}</strong></h5>
                <div className="code-container">
                    <pre style={{ border: "0px", margin: "0px" }}>{this.props.signature || ""}</pre>
                    <div className="small-codemirror">
                        <CSharpCodeMirror
                            script={val || ""}
                            onChange={newScript => { this.props.binding.setValue(newScript); this.forceUpdate(); } } />
                    </div>
                </div>
            </div>
        );
    }
}

export interface PropertyRepeaterComponentProps {
    properties: DynamicProperty[];
    dc: DynamicTypeDesignContext;
    onRemove?: (dp: DynamicProperty) => void;
}

export interface PropertyRepeaterComponentState {
    activeIndex?: number;
}

export class PropertyRepeaterComponent extends React.Component<PropertyRepeaterComponentProps, PropertyRepeaterComponentState> {

    constructor(props: PropertyRepeaterComponentProps) {
        super(props);
        this.state = { activeIndex: 0 };
    }

    componentWillMount() {
        this.props.properties.forEach(p => fetchPropertyType(p, this.props.dc));
    }

    componentWillReceiveProps(newProps: PropertyRepeaterComponentProps) {
        newProps.properties.filter(a => a._propertyType_ == undefined).forEach(p => fetchPropertyType(p, this.props.dc));
    }

    handleSelect = (activeIndex: number) => {
        this.setState({ activeIndex });
    }

    handleOnRemove = (event: React.MouseEvent, index: number) => {
        event.preventDefault();
        event.stopPropagation();
        var old = this.props.properties[index];
        this.props.properties.removeAt(index);

        if (this.state.activeIndex == index)
            this.changeState(s => s.activeIndex == undefined);

        this.props.dc.refreshView();

        if (this.props.onRemove)
            this.props.onRemove(old);
    }

    handleOnMoveUp = (event: React.MouseEvent, index: number) => {
        event.preventDefault();
        event.stopPropagation();
        const newIndex = this.props.properties.moveUp(index);
        if (newIndex != index) {
            if (index == this.state.activeIndex)
                this.changeState(s => s.activeIndex--);
            else if (newIndex == this.state.activeIndex)
                this.changeState(s => s.activeIndex++);
        }

        this.props.dc.refreshView();
    }

    handleOnMoveDown = (event: React.MouseEvent, index: number) => {
        event.preventDefault();
        event.stopPropagation();
        const newIndex = this.props.properties.moveDown(index);

        if (newIndex != index) {
            if (index == this.state.activeIndex)
                this.changeState(s => s.activeIndex++);
            else if (newIndex == this.state.activeIndex)
                this.changeState(s => s.activeIndex--);
        }

        this.props.dc.refreshView();
    }

    handleCreateClick = (event: React.SyntheticEvent) => {
        var p = {
            uid: this.createGuid(),
            name: "Name",
            type: "string",
            isNullable: "No",
        } as DynamicProperty;
        autoFix(p);
        this.props.properties.push(p);
        this.changeState(s => s.activeIndex = this.props.properties.length - 1);
        this.props.dc.refreshView();

        fetchPropertyType(p, this.props.dc);
    }

    createGuid() {
        let d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    render() {
        return (
            <div className="properties">
                <PanelGroup activeKey={this.state.activeIndex} onSelect={this.handleSelect as any} accordion>
                    {
                        this.props.properties.map((p, i) =>
                            <Panel header={this.renderPropertyHeader(p, i)} eventKey={i} key={i} bsStyle="info">
                                <PropertyComponent property={p} dc={this.props.dc} />
                            </Panel>)
                    }
                </PanelGroup>
                <a title={EntityControlMessage.Create.niceToString()}
                    className="sf-line-button sf-create"
                    onClick={this.handleCreateClick}>
                    <span className="glyphicon glyphicon-plus sf-create sf-create-label"/>{EntityControlMessage.Create.niceToString()}
                </a>
            </div>
        );
    }

    renderPropertyHeader(p: DynamicProperty, i: number) {
        return (
            <div>

                <span className="item-group">
                    <a className={classes("sf-line-button", "sf-remove")}
                        onClick={e => this.handleOnRemove(e, i)}
                        title={EntityControlMessage.Remove.niceToString()}>
                        <span className="glyphicon glyphicon-remove" />
                    </a>

                    <a className={classes("sf-line-button", "move-up")}
                        onClick={e => this.handleOnMoveUp(e, i)}
                        title={EntityControlMessage.MoveUp.niceToString()}>
                        <span className="glyphicon glyphicon-chevron-up" />
                    </a>

                    <a className={classes("sf-line-button", "move-down")}
                        onClick={e => this.handleOnMoveDown(e, i)}
                        title={EntityControlMessage.MoveDown.niceToString()}>
                        <span className="glyphicon glyphicon-chevron-down" />
                    </a>
                </span>
                {" " + (p._propertyType_ || "") + " " + p.name}
            </div>
        );
    }
}

function fetchPropertyType(p: DynamicProperty, dc: DynamicTypeDesignContext) {
    p._propertyType_ = "";
    DynamicTypeClient.API.getPropertyType(p).then(s => {
        p._propertyType_ = s;
        dc.refreshView();
    }).done()
}


export interface PropertyComponentProps {
    property: DynamicProperty;
    dc: DynamicTypeDesignContext;
}

export class PropertyComponent extends React.Component<PropertyComponentProps, void>{

    handleAutoFix = () => {

        const p = this.props.property;

        autoFix(p);

        this.props.dc.refreshView();

        fetchPropertyType(p, this.props.dc);
    }

    render() {
        var p = this.props.property
        return (
            <div>
                <div className="row">
                    <div className="col-sm-8">
                        <ValueComponent dc={this.props.dc} labelColumns={3} binding={Binding.create(p, d => d.name)} type="string" defaultValue={null} />
                        <TypeCombo dc={this.props.dc} labelColumns={3} binding={Binding.create(p, d => d.type)} onBlur={this.handleAutoFix}/>
                        <ValueComponent dc={this.props.dc} labelColumns={3} binding={Binding.create(p, d => d.isNullable)} type="string" defaultValue={null} options={DynamicTypeClient.IsNullableValues} onChange={this.handleAutoFix} />
                    </div>
                    <div className="col-sm-4">
                        <ValueComponent dc={this.props.dc} labelColumns={5} binding={Binding.create(p, d => d.isMList)} type="boolean" defaultValue={null} onChange={this.handleAutoFix} />

                        {p.type && <div>
                            {p.isMList && < ValueComponent dc={this.props.dc} labelColumns={5} binding={Binding.create(p, d => d.preserveOrder)} type="boolean" defaultValue={null} />}

                            {isEntity(p.type) && <ValueComponent dc={this.props.dc} labelColumns={5} binding={Binding.create(p, d => d.isLite)} type="boolean" defaultValue={null} onChange={this.handleAutoFix} />}

                            {allowsSize(p.type) &&
                                <ValueComponent dc={this.props.dc} labelColumns={5} binding={Binding.create(p, d => d.size)} type="number" defaultValue={null} onBlur={this.handleAutoFix} />}

                            {(isDecimal(p.type)) &&
                                <ValueComponent dc={this.props.dc} labelColumns={5} binding={Binding.create(p, d => d.scale)} type="number" defaultValue={null} onBlur={this.handleAutoFix} />}

                            <ValueComponent dc={this.props.dc} labelColumns={5} binding={Binding.create(p, d => d.uniqueIndex)} type="string" defaultValue={null} options={DynamicTypeClient.UniqueIndexValues} />
                        </div>}
                    </div>
                </div >
                <ValidatorRepeaterComponent dc={this.props.dc} property={this.props.property} />
            </div>
        );
    }
}

export class TypeCombo extends React.Component<{ dc: DynamicTypeDesignContext; binding: Binding<string>; labelColumns: number; onBlur: ()=> void }, { suggestions: string[] }>{

    constructor(props: any) {
        super(props);
        this.state = { suggestions: [] };
    }

    handleGetItems = (query: string) => {
        return DynamicTypeClient.API.autocompleteType(query, 5)
    }

    handleOnChange = (newValue: string) => {
        this.props.binding.setValue(newValue);
        this.props.dc.refreshView();
    }

    render() {
        let lc = this.props.labelColumns;
        return (
            <div className="form-group form-sm" >
                <label className={classes("control-label", "col-sm-" + (lc == null ? 2 : lc))}>
                    {this.props.binding.member}
                </label>
                <div className={"col-sm-" + (lc == null ? 10 : 12 - lc)}>
                    <div style={{ position: "relative" }}>
                        <Typeahead
                            inputAttrs={{ className: "form-control sf-entity-autocomplete" }}
                            onBlur={this.props.onBlur}
                            getItems={this.handleGetItems} 
                            value={this.props.binding.getValue()}
                            onChange={this.handleOnChange} />
                    </div>
                </div>
            </div>);
    }
}

function autoFix(p: DynamicProperty) {

    if (!p.type)
        return;

    if (p.scale != undefined && !isDecimal(p.type))
        p.scale = undefined;

    if (p.isLite != undefined && !isEntity(p.type))
        p.isLite = undefined;

    if (p.preserveOrder != undefined && !p.isMList)
        p.preserveOrder = undefined;

    if (p.size != undefined && !allowsSize(p.type))
        p.size = undefined;

    if (p.size === undefined && isString(p.type))
        p.size = 200;

    if (!p.validators)
        p.validators = [];

    p.validators = p.validators.filter(dv => registeredValidators[dv.type].allowed(p));

    if (registeredValidators["NotNull"].allowed(p)) {
        if (!p.validators.some(a => a.type == "NotNull"))
            p.validators.push({ type: "NotNull" });
    }

    if (registeredValidators["StringLength"].allowed(p)) {

        var c = p.validators.filter(a => a.type == "StringLength").firstOrNull() as Validators.StringLength | undefined;
        if (!c) {
            p.validators.push(c = { type: "StringLength" } as any as Validators.StringLength);
        }

        if (c.min == null)
            c.min == 3;

        c.max = p.size;
        c.allowNulls = p.isNullable == "Yes";
    }

    if (p.validators.length == 0)
        delete p.validators;
}

function allowsSize(type: string) {
    return isString(type) || isDecimal(type);
}


export interface ComboBoxRepeaterComponentProps {
    options: string[];
    list: string[];
}

export class ComboBoxRepeaterComponent extends React.Component<ComboBoxRepeaterComponentProps, void> {

    handleChange = (val: string, index: number) => {
        var list = this.props.list;
        list[index] = val;
        this.forceUpdate();
    }

    handleCreateClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        this.props.list.push("");
        this.forceUpdate();
    }

    handleOnRemove = (event: React.MouseEvent, index: number) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.list.removeAt(index);
        this.forceUpdate();
    }

    handleOnMoveUp = (event: React.MouseEvent, index: number) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.list.moveUp(index);
        this.forceUpdate();
    }

    handleOnMoveDown = (event: React.MouseEvent, index: number) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.list.moveDown(index);
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <table className="table table-condensed">
                    <tbody>
                        {
                            this.props.list.map((value, i) => this.renderHeader(value, i))
                        }
                        <tr>
                            <td colSpan={2}>
                                <a title={EntityControlMessage.Create.niceToString()}
                                    className="sf-line-button sf-create"
                                    onClick={this.handleCreateClick}>
                                    <span className="glyphicon glyphicon-plus sf-create sf-create-label" />{EntityControlMessage.Create.niceToString()}
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    renderHeader(value: string, i: number) {
        return (
            <tr key={i}>
                <td>
                    <span className="item-group">
                        <a className={classes("sf-line-button", "sf-remove")}
                            onClick={e => this.handleOnRemove(e, i)}
                            title={EntityControlMessage.Remove.niceToString()}>
                            <span className="glyphicon glyphicon-remove" />
                        </a>

                        <a className={classes("sf-line-button", "move-up")}
                            onClick={e => this.handleOnMoveUp(e, i)}
                            title={EntityControlMessage.MoveUp.niceToString()}>
                            <span className="glyphicon glyphicon-chevron-up" />
                        </a>

                        <a className={classes("sf-line-button", "move-down")}
                            onClick={e => this.handleOnMoveDown(e, i)}
                            title={EntityControlMessage.MoveDown.niceToString()}>
                            <span className="glyphicon glyphicon-chevron-down" />
                        </a>
                    </span>
                </td>
                <td className="form-sm">
                    <Combobox value={value} key={i}
                        data={this.props.options.filter(o => o == value || !this.props.list.contains(o))}
                        onChange={val => this.handleChange(val, i)} />
                </td>
            </tr>
        );
    }
}

export interface ValidatorRepeaterComponentProps {
    property: DynamicProperty;
    dc: DynamicTypeDesignContext;
}

export class ValidatorRepeaterComponent extends React.Component<ValidatorRepeaterComponentProps, void> {


    handleOnRemove = (event: React.MouseEvent, index: number) => {
        event.preventDefault();
        var list = this.props.property.validators!;
        list.removeAt(index);
        if (list.length == 0)
            delete this.props.property.validators;
        this.props.dc.refreshView();
    }

    handleCreateClick = (event: React.SyntheticEvent) => {

        let val = this.props.property.validators!;
        if (val == null)
            this.props.property.validators = val = [];

        SelectorModal.chooseElement(Dic.getValues(registeredValidators).filter(a => a.allowed(this.props.property)), {
            title: "New Validator",
            message: "Please select a validator type",
            display: vo => vo.name
        }).then(vo => {
            if (vo == undefined)
                return;

            val.push({ type: vo.name });
            this.props.dc.refreshView();
        });
    }

    render() {
        return (
            <div className="validators">
                <h4>Validators</h4>
                <div className="panel-group">
                    {
                        (this.props.property.validators || []).map((val, i) =>
                            <Panel header={this.renderHeader(val, i)} eventKey={i} key={i} bsStyle="warning">
                                {registeredValidators[val.type].render && registeredValidators[val.type].render!(val, this.props.dc)}
                            </Panel>)
                    }
                </div>
                <a title={EntityControlMessage.Create.niceToString()}
                    className="sf-line-button sf-create"
                    onClick={this.handleCreateClick}>
                    <span className="glyphicon glyphicon-plus sf-create sf-create-label" />{EntityControlMessage.Create.niceToString()}
                </a>
            </div>
        );
    }

    renderHeader(val: Validators.DynamicValidator, i: number) {
        return (
            <div>
                <span className="item-group">
                    <a className={classes("sf-line-button", "sf-remove")}
                        onClick={e => this.handleOnRemove(e, i)}
                        title={EntityControlMessage.Remove.niceToString()}>
                        <span className="glyphicon glyphicon-remove" />
                    </a>
                </span>
                {" "}
                {val.type}
            </div>
        );
    }
}

function isReferenceType(type: string) {
    return isEntity(type) || isString(type);
}

function isString(type: string) {
    return type == "string";
}

function isDateTime(type: string) {
    return type == "DateTime";
}

function isTimeSpan(type: string) {
    return type == "TimeSpan";
}

function isInteger(type: string) {
    return (
        type == "byte" || type == "System.Byte" ||
        type == "sbyte" || type == "System.SByte" ||
        type == "short" || type == "System.Int16" ||
        type == "ushort" || type == "System.UInt16" ||
        type == "int" || type == "System.Int32" ||
        type == "uint" || type == "System.UInt32" ||
        type == "long" || type == "System.Int64" ||
        type == "ulong" || type == "System.UInt64"
    );
}

function isDecimal(type: string) {
    return (
        type == "float" || type == "System.Single" ||
        type == "double" || type == "System.Double" ||
        type == "decimal" || type == "System.Decimal"
    );
}

function isEntity(type: string) {
    return type.endsWith("Entity");
}

export interface ValidatorOptions<T extends Validators.DynamicValidator> {
    name: string;
    allowed: (p: DynamicProperty) => boolean
    render?: (val: T, dc: DynamicTypeDesignContext) => React.ReactElement<any>;
}

export const registeredValidators: { [name: string]: ValidatorOptions<Validators.DynamicValidator> } = {};

export function registerValidator<T extends Validators.DynamicValidator>(options: ValidatorOptions<T>) {
    registeredValidators[options.name] = options;
}

registerValidator<Validators.DynamicValidator>({ name: "NotNull", allowed: p => p.isMList == true || !isString(p.type) && (p.isNullable == "No" && isReferenceType(p.type) || p.isNullable == "OnlyInMemory") });

registerValidator<Validators.StringLength>({
    name: "StringLength",
    allowed: p => !p.isMList && isString(p.type),
    render: (val, dc) =>
        <div className="row">
            <div className="col-sm-4">
                <ValueComponent dc={dc} labelColumns={6} binding={Binding.create(val, v => v.allowNulls)} type="boolean" defaultValue={false} />
                <ValueComponent dc={dc} labelColumns={6} binding={Binding.create(val, v => v.multiLine)} type="boolean" defaultValue={false} />
            </div>
            <div className="col-sm-4">
                <ValueComponent dc={dc} labelColumns={6} binding={Binding.create(val, v => v.min)} type="number" defaultValue={null} />
                <ValueComponent dc={dc} labelColumns={6} binding={Binding.create(val, v => v.max)} type="number" defaultValue={null} />
            </div>
            <div className="col-sm-4">
                <ValueComponent dc={dc} labelColumns={8} binding={Binding.create(val, v => v.allowLeadingSpaces)} type="boolean" defaultValue={val.multiLine} autoOpacity={true} />
                <ValueComponent dc={dc} labelColumns={8} binding={Binding.create(val, v => v.allowTrailingSpaces)} type="boolean" defaultValue={val.multiLine} autoOpacity={true} />
            </div>
        </div>
});

registerValidator<Validators.StringCase>({
    name: "StringCase",
    allowed: p => !p.isMList && isString(p.type),
    render: (val, dc) =>
        <div>
            <ValueComponent dc={dc} binding={Binding.create(val, v => v.textCase)} type="string" options={Validators.StringCaseTypeValues} defaultValue={null} />
        </div>
});

registerValidator<Validators.DynamicValidator>({ name: "EMail", allowed: p => !p.isMList && isString(p.type) });
registerValidator<Validators.DynamicValidator>({ name: "Telephone", allowed: p => !p.isMList && isString(p.type) });
registerValidator<Validators.DynamicValidator>({ name: "MultipleTelephone", allowed: p => !p.isMList && isString(p.type) });
registerValidator<Validators.DynamicValidator>({ name: "NumericText", allowed: p => !p.isMList && isString(p.type) });
registerValidator<Validators.DynamicValidator>({ name: "URL", allowed: p => !p.isMList && isString(p.type) });
registerValidator<Validators.DynamicValidator>({ name: "FileName", allowed: p => !p.isMList && isString(p.type) });
registerValidator<Validators.DynamicValidator>({ name: "Ip", allowed: p => !p.isMList && isString(p.type) });

registerValidator<Validators.DynamicValidator>({ name: "NoRepeat", allowed: p => p.isMList == true });
registerValidator<Validators.CountIs>({
    name: "CountIs",
    allowed: p => p.isMList == true,
    render: (val, dc) =>
        <div className="row">
            <div className="col-sm-6">
                <ValueComponent dc={dc} labelColumns={6} binding={Binding.create(val, v => v.comparisonType)} type="string" options={Validators.ComparisonTypeValues} defaultValue={null} />
            </div>
            <div className="col-sm-6">
                <ValueComponent dc={dc} labelColumns={6} binding={Binding.create(val, v => v.number)} type="number" defaultValue={null} />
            </div>
        </div>
});

registerValidator<Validators.DynamicValidator>({ name: "DateInPast", allowed: p => !p.isMList && isDateTime(p.type) });
registerValidator<Validators.DateTimePrecision>({
    name: "DateTimePrecision",
    allowed: p => !p.isMList && isDateTime(p.type),
    render: (val, dc) =>
        <div>
            <ValueComponent dc={dc} binding={Binding.create(val, v => v.precision)} type="string" options={Validators.DateTimePrecisionTypeValues} defaultValue={null} />
        </div>
});

registerValidator<Validators.TimeSpanPrecision>({
    name: "TimeSpanPrecision",
    allowed: p => !p.isMList && isTimeSpan(p.type),
    render: (val, dc) =>
        <div>
            <ValueComponent dc={dc} binding={Binding.create(val, v => v.precision)} type="string" options={Validators.DateTimePrecisionTypeValues} defaultValue={null} />
        </div>
});

registerValidator<Validators.Decimals>({
    name: "Decimals",
    allowed: p => !p.isMList && isDecimal(p.type),
    render: (val, dc) =>
        <div>
            <ValueComponent dc={dc} binding={Binding.create(val, v => v.decimalPlaces)} type="number" defaultValue={null} />
        </div>
});

registerValidator<Validators.NumberBetween>({
    name: "NumberBetween",
    allowed: p => !p.isMList && isInteger(p.type),
    render: (val, dc) =>
        <div className="row">
            <div className="col-sm-6">
                <ValueComponent dc={dc} labelColumns={6} binding={Binding.create(val, v => v.min)} type="number" defaultValue={null} />
            </div>
            <div className="col-sm-6">
                <ValueComponent dc={dc} labelColumns={6} binding={Binding.create(val, v => v.max)} type="number" defaultValue={null} />
            </div>
        </div>
});

registerValidator<Validators.NumberIs>({
    name: "NumberIs",
    allowed: p => !p.isMList && isInteger(p.type),
    render: (val, dc) =>
        <div className="row">
            <div className="col-sm-6">
                <ValueComponent dc={dc} labelColumns={6} binding={Binding.create(val, v => v.comparisonType)} type="string" options={Validators.ComparisonTypeValues} defaultValue={null} />
            </div>
            <div className="col-sm-6">
                <ValueComponent dc={dc} labelColumns={6} binding={Binding.create(val, v => v.number)} type="number" defaultValue={null} />
            </div>
        </div>
});


