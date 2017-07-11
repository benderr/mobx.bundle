import React from 'react';
import PropTypes from 'prop-types';
import groupShape from './groupShape';

class ModificationForm extends React.Component {

	handleOpenModifier(e, {groupId, modifierId}) {
		this.props.onOpenModifier({groupId, modifierId});
		e.preventDefault();
		e.stopPropagation();
	}

	handleRemoveModifier(e, {groupId, modifierId}) {
		this.props.onRemoveModifier({groupId, modifierId});
		e.preventDefault();
		e.stopPropagation();
	}

	render() {
		let {
			className, modifiers = [], onAddGroup, onOpenGroup, onAddModifier,
			onToggleModifier,
		}=this.props;

		return (
			<div className={className || ''}>
				<a className="icon-plus  add_modificators_group" onClick={() => onAddGroup()}>Добавить
					группу</a>

				{modifiers.map(group => (
					<div className="modificators_group" key={group.id}>
						<div className="modificators_group_title">{group.name}
							<a className="icon-pencil" onClick={() => onOpenGroup(group.id)}></a>
						</div>

						<div className="modificators_wrapper">
							{group.modifiers.map(m => (
								<div key={m.id}
									 className={m.selected ? 'selected' : ''}
									 onClick={() => onToggleModifier({modifierId: m.id, groupId: group.id})}>
									{m.name}
									<div class="controls">
										<a class="icon-pencil"
										   onClick={e => this.handleOpenModifier(e, {
											   modifierId: m.id,
											   groupId: group.id
										   })}></a>
										<a class="icon-trash-bin"
										   onClick={e => this.handleRemoveModifier(e, {
											   modifierId: m.id,
											   groupId: group.id
										   })}></a>
									</div>
								</div>
							))}
							<div className="add_new_modificator"
								 onClick={() => onAddModifier({groupId: group.id})}>+
							</div>
						</div>
					</div>
				))}
			</div>);
	}
}

ModificationForm.propTypes = {
	className: PropTypes.string,
	modifiers: PropTypes.arrayOf(groupShape),
	onAddGroup: PropTypes.func.isRequired,
	onOpenGroup: PropTypes.func.isRequired,
	onAddModifier: PropTypes.func.isRequired,
	onOpenModifier: PropTypes.func.isRequired,
	onRemoveModifier: PropTypes.func.isRequired,
	onToggleModifier: PropTypes.func.isRequired
};

export default ModificationForm;