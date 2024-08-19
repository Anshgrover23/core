import { traceProps } from "@tscircuit/props"
import { BaseComponent } from "./BaseComponent"

export class Trace extends BaseComponent<typeof traceProps> {
  get config() {
    return {
      zodProps: traceProps,
    }
  }

  getTracePortPathSelectors(): string[] {
    if ("from" in this.props && "to" in this.props) {
      return [
        typeof this.props.from === "string"
          ? this.props.from
          : this.props.from.getPortSelector(),
        typeof this.props.to === "string"
          ? this.props.to
          : this.props.to.getPortSelector(),
      ]
    }
    if ("path" in this.props) {
      return this.props.path.map((p) =>
        typeof p === "string" ? p : p.getPortSelector(),
      )
    }
    return []
  }

  doInitialPcbTraceRender(): void {
    const { db } = this.project!
    const { props } = this

    const portSelectors = this.getTracePortPathSelectors()
    console.log(portSelectors)

    // db.pcb_port.getUsing({ source_port_id:

    // const pcb_trace = db.pcb_trace.insert({
    //   from: props.from.pcb_component_id,
    //   to: props.to.pcb_component_id,
    //   width: props.width,
    //   color: props.color,
    // })
  }
}