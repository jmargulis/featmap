import React, {Component} from 'react';
import {connect} from 'react-redux'
import {AppState} from '../store'
import {application} from '../store/application/selectors'
import {IApplication} from '../store/application/types';
import OnClickOut from 'react-onclickoutside';
import {allAnnotations, Color, dbAnnotationsFromNames, filterBarState} from '../core/misc';
import {setFilterAction} from "../store/filters/actions";
import ColorPicker from "./ColorPicker";
import {Button, DarkButton} from "./elements";
import ContextMenu from "./ContextMenu";

const mapStateToProps = (state: AppState) => ({
  application: application(state)
})

const mapDispatchToProps = {
  setFilter: setFilterAction,
}

interface PropsFromState {
  application: IApplication
}

interface PropsFromDispatch {
  setFilter: typeof setFilterAction,
}
interface SelfProps {
  close: () => void
  pageState: filterBarState
  setPageState: (s: filterBarState) => void
}
type Props = PropsFromState & PropsFromDispatch & SelfProps

interface State {
}


class Filter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  keydownHandler = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      this.props.close()
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownHandler, false);
  }

  handleColorChange(color: Color) {
    // this.props.setFilter({color, annotations: []})
    this.props.setPageState({color, annotations: []})
    // console.log('exiting Filter.handleColorChange')
  }

  render() {

    const parent = this

    const Dialog = class Dialog extends Component<{ close: () => void }>  {

      handleClickOutside = () => {
        this.props.close()
      }

      render() {
        const currentAnnotations = dbAnnotationsFromNames(parent.props.pageState.annotations.join(','))
        const leftOverAnnotations = allAnnotations().remove(currentAnnotations.annotations.map(c => c.name))
        return (
          <div className="flex flex-col bg-gray-900  p-3 w-100 h-screen w-full shadow-xl  text-white  ">
            <div className="flex w-full mb-2">
              <div className="text-xl flex-grow ">
                Filter
              </div>
              <div >
                <button onClick={() => this.props.close()}> <i className="material-icons ">clear</i></button>
              </div>
            </div>
            <div>
              <DarkButton primary handleOnClick={() => parent.props.setPageState({ color: Color.NONE, annotations: [] })}>
                Reset
              </DarkButton>
            </div>
            <div className="overflow-y-auto">
              <ColorPicker size={8} selected={parent.props.pageState.color} onChangeColor={(color: Color) => parent.handleColorChange(color)}/>
            </div>
            {/*<div className="flex flex-wrap">
              <ContextMenu icon="add" text="Annotation" smallIcon>
                <div className="rounded bg-white shadow-md  absolute mt-8 top-0 left-0 min-w-full text-xs" >
                  <ul className="list-reset">
                    {
                      (leftOverAnnotations).annotations.map((an, i) => {
                        return <li key={i}><Button noborder title={an.description} icon={an.icon} handleOnClick={() => this.handleAddAnnotation(an.name)} /></li>
                      })
                    }

                  </ul>
                </div>
              </ContextMenu>
            </div>*/}
          </div>
        )
      }
    }

    const DialogWithClickOutside = OnClickOut(Dialog)

    return (
      <div className=" w-full max-w-xl flex fixed  z-10  right-0 top-0   text-sm">
        <DialogWithClickOutside close={this.props.close} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
