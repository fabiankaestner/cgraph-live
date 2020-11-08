import { GroupState } from "../modules/group";
import { InstanceState } from "../modules/instance";
import { LocalState } from "../modules/local";
import { NodeState } from "../modules/node";
import { PlaybackState } from "../modules/playback";
import { RundownState } from "../modules/rundown";

export interface State {
    playback: PlaybackState;
    instance: InstanceState;
    node: NodeState;
    group: GroupState;
    rundown: RundownState;
    local: LocalState;
}
