import React from 'react';
import PropTypes from 'prop-types';
import groupShape from './groupShape';

class ModificationForm extends React.Component {
	render() {
		let {className, modifiers = [], onAddGroup, onOpenGroup, onOpenModifier, onAddModifier}=this.props;

		return (
			<div className={className || ''}>
				<a className="icon-plus  add_modificators_group" onClick={() => onAddGroup()}>Добавить
					группу</a>

				{modifiers.map(group => (
					<div className="modificators_group" key={group.id}>
						<div className="modificators_group_title">{group.name}
							<a className="icon-pencil" onClick={() => onOpenGroup(group.id)}></a>
						</div>

						<div className="wrapper_modificator">
							{group.modifiers.map(m => (
								<div key={m.id}
									 className={['modificator', m.selected || m.base ? 'selected' : ''].join(' ')}
									 onClick={() => onOpenModifier({modifierId: m.id, groupId: group.id})}>
									{m.name}</div>
							))}
							<div className="modificator  add_new_modificator"
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
	onOpenModifier: PropTypes.func.isRequired
};

export default ModificationForm;