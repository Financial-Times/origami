import {ComponentMeta} from '@storybook/react';
import {EditorialLayoutWrapper} from '../../src/tsx/editorial-layout-wrapper';
import './editorialLayout.scss';
import {EditorialLayoutHeading} from '../../src/tsx/editorial-layout-heading';
import {EditorialLayoutBody} from '../../src/tsx/editorial-layout-body';

export default {
	title: 'Maintained/o-editorial-layout',
	component: EditorialLayoutWrapper,
} as ComponentMeta<typeof EditorialLayoutWrapper>;

const WrapperTemplate = () => {
	return (
		<EditorialLayoutWrapper>
			<h1>heading 1</h1>
			<h2>heading 2</h2>

			<p>
				<a href="#">Lorem ipsum dolor sit amet consectetur</a> adipisicing elit.
				Ex velit beatae saepe adipisci consectetur. Alias nesciunt aliquam
				saepe? Itaque ratione delectus hic dignissimos ad. Quaerat consectetur
				quam incidunt odit unde natus, quos recusandae quo? Cum adipisci ex rem
				maxime beatae quos autem magni. Dignissimos, consequuntur debitis fuga
				hic deserunt natus ducimus ad culpa vero? Voluptatum, similique
				accusamus aut, quidem nemo veniam amet est repellendus corporis dolor
				odio tempore placeat impedit odit officiis id quibusdam labore,
				reiciendis autem vero eaque quod quam fuga assumenda! Ad error unde
				dolorum quaerat ipsa quae odit delectus omnis illum voluptatibus.
				Explicabo perferendis voluptas consequuntur ea.
			</p>
			<p>
				Quas dolorem harum tempora omnis veniam ut libero laboriosam fugiat
				accusamus cupiditate saepe accusantium error minus nam assumenda quod
				incidunt, obcaecati soluta consequatur impedit totam asperiores quasi
				optio eius? Temporibus, earum. Odit modi animi in eligendi. Dolores,
				quidem possimus debitis optio reiciendis, nulla corrupti animi maiores
				exercitationem ea temporibus at earum labore unde doloremque voluptas
				soluta! Autem, quasi totam rem obcaecati quae eum deleniti? Soluta
				praesentium velit libero voluptate. Neque adipisci sunt id sapiente sit
				iure autem optio exercitationem cum at hic harum rem, totam deserunt
				dolorum, necessitatibus natus. Sequi, consequuntur voluptates. Adipisci
				hic inventore dolorum laudantium ullam, aspernatur explicabo?
			</p>
			<p>
				Veritatis dicta veniam odit provident rerum aperiam ipsa ducimus
				architecto voluptate optio, perferendis quidem beatae magnam ut est
				facilis,
				<strong>
					<i>
						quos vitae<sup>sup</sup> neque facere
					</i>
				</strong>
				quisquam. Culpa animi, recusandae tempore maxime incidunt molestias,
				dolore nulla facilis porro illo mollitia consectetur modi ex iusto
				exercitationem dolorem voluptates nostrum nisi fuga laboriosam sequi
				beatae! Incidunt doloremque commodi ipsam adipisci! Officiis quod eum
				aliquam molestiae facere beatae nisi nam esse veniam delectus dolore
				harum suscipit, odit voluptatibus officia temporibus ducimus! Officia
				cumque voluptates ipsa saepe perferendis ab impedit labore, tempore,
				deserunt ducimus at? Doloremque ea consequatur temporibus nisi nulla!
				Vero laudantium quas molestiae commodi deleniti.
			</p>

			<blockquote>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ullam
					vero cum voluptatem eius dolor?
				</p>
				<cite>Lorem, ipsum.</cite>
			</blockquote>

			<p>
				<strong>Some strong copy</strong> hic voluptatum, esse optio recusandae
				numquam nostrum magni, quibusdam animi earum tenetur sit eius
				perspiciatis. Quas quidem atque id? Est architecto exercitationem,
				voluptate sint beatae repudiandae vitae neque nostrum, ut tempora
				eligendi blanditiis saepe praesentium delectus omnis molestiae quibusdam
				aliquam rerum deleniti molestias quas, maiores consequatur
				reprehenderit! Dolores libero tempore incidunt dolorem distinctio!
				Sapiente, repellat, dicta reiciendis velit in illo ducimus ullam,
				laborum nam obcaecati mollitia nulla. Saepe ipsa fugit fuga non nihil
				praesentium commodi dolorem nesciunt, ducimus quod deleniti aperiam vel
				distinctio cumque dicta dolor pariatur enim dolore illum.
			</p>

			<h3>heading 3</h3>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				<em>Some italic copy</em> adipisci consectetur. Alias nesciunt aliquam
				saepe? Itaque ratione delectus hic dignissimos ad. Quaerat consectetur
				quam incidunt odit unde natus, quos recusandae quo? Cum adipisci ex rem
				maxime beatae quos autem magni. Dignissimos, consequuntur debitis fuga
				hic deserunt natus ducimus ad culpa vero? Voluptatum, similique
				accusamus aut, quidem nemo veniam amet est repellendus corporis dolor
				odio tempore placeat impedit odit officiis id quibusdam labore,
				reiciendis autem vero eaque quod quam fuga assumenda! Ad error unde
				dolorum quaerat ipsa quae odit delectus omnis illum voluptatibus.
				Explicabo perferendis voluptas consequuntur ea.
			</p>

			<blockquote>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
					quaerat!
				</p>
				<footer>
					<cite>Lorem, ipsum dolor.</cite>
				</footer>
			</blockquote>

			<p>
				Quas<sup>sup</sup> and dolorem<sub>sub</sub> harum tempora omnis veniam
				ut libero laboriosam fugiat accusamus cupiditate saepe accusantium error
				minus nam assumenda quod incidunt, obcaecati soluta consequatur impedit
				totam asperiores quasi optio eius? Temporibus, earum. Odit modi animi in
				eligendi. Dolores, quidem possimus debitis optio reiciendis, nulla
				corrupti animi maiores exercitationem ea temporibus at earum labore unde
				doloremque voluptas soluta! Autem, quasi totam rem obcaecati quae eum
				deleniti? Soluta praesentium velit libero voluptate. Neque adipisci sunt
				id sapiente sit iure autem optio exercitationem cum at hic harum rem,
				totam deserunt dolorum, necessitatibus natus. Sequi, consequuntur
				voluptates. Adipisci hic inventore dolorum laudantium ullam, aspernatur
				explicabo?
			</p>
			<p>
				Veritatis dicta veniam odit provident rerum aperiam ipsa ducimus
				architecto voluptate optio, perferendis quidem beatae magnam ut est
				facilis, quos vitae neque facere quisquam. Culpa animi, recusandae
				tempore maxime incidunt molestias, dolore nulla facilis porro illo
				mollitia consectetur modi ex iusto exercitationem dolorem voluptates
				nostrum nisi fuga laboriosam sequi beatae! Incidunt doloremque commodi
				ipsam adipisci! Officiis quod eum aliquam molestiae facere beatae nisi
				nam esse veniam delectus dolore harum suscipit, odit voluptatibus
				officia temporibus ducimus! Officia cumque voluptates ipsa saepe
				perferendis ab impedit labore, tempore, deserunt ducimus at? Doloremque
				ea consequatur temporibus nisi nulla! Vero laudantium quas molestiae
				commodi deleniti.
			</p>

			<ol>
				<li>Lorem ipsum&#xA0;adipiscing elit.</li>
				<li>Sed feugiat turpis at massa tristique.</li>
				<li>Curabitu r accumsan elit luctus.</li>
			</ol>

			<ul>
				<li>Lorem ipsum&#xA0;adipiscing elit.</li>
				<li>Sed feugiat turpis at massa tristique.</li>
				<li>Curabitu r accumsan elit luctus.</li>
			</ul>

			<h4>heading 4</h4>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex velit beatae
				saepe adipisci consectetur. Alias nesciunt aliquam saepe? Itaque ratione
				delectus hic dignissimos ad. Quaerat consectetur quam incidunt odit unde
				natus, quos recusandae quo? Cum adipisci ex rem maxime beatae quos autem
				magni. Dignissimos, consequuntur debitis fuga hic deserunt natus ducimus
				ad culpa vero? Voluptatum, similique accusamus aut, quidem nemo veniam
				amet est repellendus corporis dolor odio tempore placeat impedit odit
				officiis id quibusdam labore, reiciendis autem vero eaque quod quam fuga
				assumenda! Ad error unde dolorum quaerat ipsa quae odit delectus omnis
				illum voluptatibus. Explicabo perferendis voluptas consequuntur ea.
			</p>
			<p>
				Quas dolorem harum tempora omnis veniam ut libero laboriosam fugiat
				accusamus cupiditate saepe accusantium error minus nam assumenda quod
				incidunt, obcaecati soluta consequatur impedit totam asperiores quasi
				optio eius? Temporibus, earum. Odit modi animi in eligendi. Dolores,
				quidem possimus debitis optio reiciendis, nulla corrupti animi maiores
				exercitationem ea temporibus at earum labore unde doloremque voluptas
				soluta! Autem, quasi totam rem obcaecati quae eum deleniti? Soluta
				praesentium velit libero voluptate. Neque adipisci sunt id sapiente sit
				iure autem optio exercitationem cum at hic harum rem, totam deserunt
				dolorum, necessitatibus natus. Sequi, consequuntur voluptates. Adipisci
				hic inventore dolorum laudantium ullam, aspernatur explicabo?
			</p>

			<h5>heading 5</h5>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex velit beatae
				saepe adipisci consectetur. Alias nesciunt aliquam saepe? Itaque ratione
				delectus hic dignissimos ad. Quaerat consectetur quam incidunt odit unde
				natus, quos recusandae quo? Cum adipisci ex rem maxime beatae quos autem
				magni. Dignissimos, consequuntur debitis fuga hic deserunt natus ducimus
				ad culpa vero? Voluptatum, similique accusamus aut, quidem nemo veniam
				amet est repellendus corporis dolor odio tempore placeat impedit odit
				officiis id quibusdam labore, reiciendis autem vero eaque quod quam fuga
				assumenda! Ad error unde dolorum quaerat ipsa quae odit delectus omnis
				illum voluptatibus. Explicabo perferendis voluptas consequuntur ea.
			</p>
		</EditorialLayoutWrapper>
	);
};

export const WrapperWithNestedElements = WrapperTemplate.bind({});

const ContentBodyMarginsTemplate = () => {
	return (
		<>
			<EditorialLayoutHeading headingLevel="1">
				heading 1
			</EditorialLayoutHeading>
			<EditorialLayoutHeading headingLevel="2">
				heading 2
			</EditorialLayoutHeading>

			<EditorialLayoutBody>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex velit beatae
				saepe adipisci consectetur. Alias nesciunt aliquam saepe? Itaque ratione
				delectus hic dignissimos ad. Quaerat consectetur quam incidunt odit unde
				natus, quos recusandae quo? Cum adipisci ex rem maxime beatae quos autem
				magni. Dignissimos, consequuntur debitis fuga hic deserunt natus ducimus
				ad culpa vero? Voluptatum, similique accusamus aut, quidem nemo veniam
				amet est repellendus corporis dolor odio tempore placeat impedit odit
				officiis id quibusdam labore, reiciendis autem vero eaque quod quam fuga
				assumenda! Ad error unde dolorum quaerat ipsa quae odit delectus omnis
				illum voluptatibus. Explicabo perferendis voluptas consequuntur ea.
			</EditorialLayoutBody>
			<EditorialLayoutBody>
				Quas dolorem harum tempora omnis veniam ut libero laboriosam fugiat
				accusamus cupiditate saepe accusantium error minus nam assumenda quod
				incidunt, obcaecati soluta consequatur impedit totam asperiores quasi
				optio eius? Temporibus, earum. Odit modi animi in eligendi. Dolores,
				quidem possimus debitis optio reiciendis, nulla corrupti animi maiores
				exercitationem ea temporibus at earum labore unde doloremque voluptas
				soluta! Autem, quasi totam rem obcaecati quae eum deleniti? Soluta
				praesentium velit libero voluptate. Neque adipisci sunt id sapiente sit
				iure autem optio exercitationem cum at hic harum rem, totam deserunt
				dolorum, necessitatibus natus. Sequi, consequuntur voluptates. Adipisci
				hic inventore dolorum laudantium ullam, aspernatur explicabo?
			</EditorialLayoutBody>
			<EditorialLayoutBody>
				Veritatis dicta veniam odit provident rerum aperiam ipsa ducimus
				architecto voluptate optio, perferendis quidem beatae magnam ut est
				facilis, quos vitae neque facere quisquam. Culpa animi, recusandae
				tempore maxime incidunt molestias, dolore nulla facilis porro illo
				mollitia consectetur modi ex iusto exercitationem dolorem voluptates
				nostrum nisi fuga laboriosam sequi beatae! Incidunt doloremque commodi
				ipsam adipisci! Officiis quod eum aliquam molestiae facere beatae nisi
				nam esse veniam delectus dolore harum suscipit, odit voluptatibus
				officia temporibus ducimus! Officia cumque voluptates ipsa saepe
				perferendis ab impedit labore, tempore, deserunt ducimus at? Doloremque
				ea consequatur temporibus nisi nulla! Vero laudantium quas molestiae
				commodi deleniti.
			</EditorialLayoutBody>
			<EditorialLayoutBody>
				Expedita error placeat soluta odit modi. Voluptatem, illum neque
				inventore hic voluptatum, esse optio recusandae numquam nostrum magni,
				quibusdam animi earum tenetur sit eius perspiciatis. Quas quidem atque
				id? Est architecto exercitationem, voluptate sint beatae repudiandae
				vitae neque nostrum, ut tempora eligendi blanditiis saepe praesentium
				delectus omnis molestiae quibusdam aliquam rerum deleniti molestias
				quas, maiores consequatur reprehenderit! Dolores libero tempore incidunt
				dolorem distinctio! Sapiente, repellat, dicta reiciendis velit in illo
				ducimus ullam, laborum nam obcaecati mollitia nulla. Saepe ipsa fugit
				fuga non nihil praesentium commodi dolorem nesciunt, ducimus quod
				deleniti aperiam vel distinctio cumque dicta dolor pariatur enim dolore
				illum.
			</EditorialLayoutBody>

			<EditorialLayoutHeading headingLevel="3">
				heading 3
			</EditorialLayoutHeading>

			<EditorialLayoutBody>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex velit beatae
				saepe adipisci consectetur. Alias nesciunt aliquam saepe? Itaque ratione
				delectus hic dignissimos ad. Quaerat consectetur quam incidunt odit unde
				natus, quos recusandae quo? Cum adipisci ex rem maxime beatae quos autem
				magni. Dignissimos, consequuntur debitis fuga hic deserunt natus ducimus
				ad culpa vero? Voluptatum, similique accusamus aut, quidem nemo veniam
				amet est repellendus corporis dolor odio tempore placeat impedit odit
				officiis id quibusdam labore, reiciendis autem vero eaque quod quam fuga
				assumenda! Ad error unde dolorum quaerat ipsa quae odit delectus omnis
				illum voluptatibus. Explicabo perferendis voluptas consequuntur ea.
			</EditorialLayoutBody>
			<EditorialLayoutBody>
				Quas dolorem harum tempora omnis veniam ut libero laboriosam fugiat
				accusamus cupiditate saepe accusantium error minus nam assumenda quod
				incidunt, obcaecati soluta consequatur impedit totam asperiores quasi
				optio eius? Temporibus, earum. Odit modi animi in eligendi. Dolores,
				quidem possimus debitis optio reiciendis, nulla corrupti animi maiores
				exercitationem ea temporibus at earum labore unde doloremque voluptas
				soluta! Autem, quasi totam rem obcaecati quae eum deleniti? Soluta
				praesentium velit libero voluptate. Neque adipisci sunt id sapiente sit
				iure autem optio exercitationem cum at hic harum rem, totam deserunt
				dolorum, necessitatibus natus. Sequi, consequuntur voluptates. Adipisci
				hic inventore dolorum laudantium ullam, aspernatur explicabo?
			</EditorialLayoutBody>
			<EditorialLayoutBody>
				Veritatis dicta veniam odit provident rerum aperiam ipsa ducimus
				architecto voluptate optio, perferendis quidem beatae magnam ut est
				facilis, quos vitae neque facere quisquam. Culpa animi, recusandae
				tempore maxime incidunt molestias, dolore nulla facilis porro illo
				mollitia consectetur modi ex iusto exercitationem dolorem voluptates
				nostrum nisi fuga laboriosam sequi beatae! Incidunt doloremque commodi
				ipsam adipisci! Officiis quod eum aliquam molestiae facere beatae nisi
				nam esse veniam delectus dolore harum suscipit, odit voluptatibus
				officia temporibus ducimus! Officia cumque voluptates ipsa saepe
				perferendis ab impedit labore, tempore, deserunt ducimus at? Doloremque
				ea consequatur temporibus nisi nulla! Vero laudantium quas molestiae
				commodi deleniti.
			</EditorialLayoutBody>

			<EditorialLayoutHeading headingLevel="4">
				heading 4
			</EditorialLayoutHeading>

			<EditorialLayoutBody>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex velit beatae
				saepe adipisci consectetur. Alias nesciunt aliquam saepe? Itaque ratione
				delectus hic dignissimos ad. Quaerat consectetur quam incidunt odit unde
				natus, quos recusandae quo? Cum adipisci ex rem maxime beatae quos autem
				magni. Dignissimos, consequuntur debitis fuga hic deserunt natus ducimus
				ad culpa vero? Voluptatum, similique accusamus aut, quidem nemo veniam
				amet est repellendus corporis dolor odio tempore placeat impedit odit
				officiis id quibusdam labore, reiciendis autem vero eaque quod quam fuga
				assumenda! Ad error unde dolorum quaerat ipsa quae odit delectus omnis
				illum voluptatibus. Explicabo perferendis voluptas consequuntur ea.
			</EditorialLayoutBody>
			<EditorialLayoutBody>
				Quas dolorem harum tempora omnis veniam ut libero laboriosam fugiat
				accusamus cupiditate saepe accusantium error minus nam assumenda quod
				incidunt, obcaecati soluta consequatur impedit totam asperiores quasi
				optio eius? Temporibus, earum. Odit modi animi in eligendi. Dolores,
				quidem possimus debitis optio reiciendis, nulla corrupti animi maiores
				exercitationem ea temporibus at earum labore unde doloremque voluptas
				soluta! Autem, quasi totam rem obcaecati quae eum deleniti? Soluta
				praesentium velit libero voluptate. Neque adipisci sunt id sapiente sit
				iure autem optio exercitationem cum at hic harum rem, totam deserunt
				dolorum, necessitatibus natus. Sequi, consequuntur voluptates. Adipisci
				hic inventore dolorum laudantium ullam, aspernatur explicabo?
			</EditorialLayoutBody>

			<EditorialLayoutHeading headingLevel="5">
				heading 5
			</EditorialLayoutHeading>

			<EditorialLayoutBody>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex velit beatae
				saepe adipisci consectetur. Alias nesciunt aliquam saepe? Itaque ratione
				delectus hic dignissimos ad. Quaerat consectetur quam incidunt odit unde
				natus, quos recusandae quo? Cum adipisci ex rem maxime beatae quos autem
				magni. Dignissimos, consequuntur debitis fuga hic deserunt natus ducimus
				ad culpa vero? Voluptatum, similique accusamus aut, quidem nemo veniam
				amet est repellendus corporis dolor odio tempore placeat impedit odit
				officiis id quibusdam labore, reiciendis autem vero eaque quod quam fuga
				assumenda! Ad error unde dolorum quaerat ipsa quae odit delectus omnis
				illum voluptatibus. Explicabo perferendis voluptas consequuntur ea.
			</EditorialLayoutBody>
		</>
	);
};
export const ContentBodyMargins = ContentBodyMarginsTemplate.bind({});
