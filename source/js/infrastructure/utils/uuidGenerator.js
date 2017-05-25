/**
 * Created by RobertSabiryanov on 24.05.17.
 */
import * as generator from 'node-uuid'

export const uuid = () => {
	return generator.v4();
}