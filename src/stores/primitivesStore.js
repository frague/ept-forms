import { action, observable, autorun } from 'mobx';
import { epts } from '../data';

export default class PrimitivesStore {
	@observable items = Map.from(epts);

}