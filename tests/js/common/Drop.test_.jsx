/**
 * Created by RobertSabiryanov on 11.07.17.
 */
import React from 'react';
import {Drop} from 'common/uiElements';
import renderer from 'react-test-renderer';

// function createNodeMock(element) {
//     if (element.type === 'div') {
//         return {
//             getAttribute() {},
//             ownerDocument:{
//                 defaultView: {
//                     SVGAnimatedString:  function () {
//
//                     }
//                 }
// 			},
//             className:"",
//             setAttribute(){},
//             addEventListener(){}
//         };
//     }
//     return null;
// }

jest.unmock('tether-drop');

test('Drop changes the class on click', () => {
	let onClickHandler=()=>{

	};
	const component = renderer.create(
		<Drop position="bottom right">
			<a class="icon-pos drop-target" name="label"><span>Нажми меня</span></a>

			<div class="drop-content">
				<div class="drop-content-inner">
					<ul class="drop-menu f_small">
						<li><a class="icon-settings" onClick={onClickHandler}>Один</a></li>
						<li><a class="icon-settings" onClick={onClickHandler}>Два</a></li>
						<li><a class="icon-settings" onClick={onClickHandler}>Три</a></li>
					</ul>
				</div>
			</div>
		</Drop>
	);
    //, {createNodeMock}
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// // manually trigger the callback
	// tree.props.onMouseEnter();
	// // re-rendering
	// tree = component.toJSON();
	// expect(tree).toMatchSnapshot();
    //
	// // manually trigger the callback
	// tree.props.onMouseLeave();
	// // re-rendering
	// tree = component.toJSON();
	// expect(tree).toMatchSnapshot();
});