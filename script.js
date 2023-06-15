let count = {
	'uk-company': 0,
	'uk-government': 0,
	'foreign-company': 0,
	'foreign-government': 0,
	'train-service': 0
};

window.onload = () => {
	// Add event listeners to key groups
	const keyGroups = document.querySelectorAll('div.group');
	keyGroups.forEach((group) => {
		group.addEventListener('mouseenter', handleGroupHover);
		group.addEventListener('mouseout', handleGroupHoverOut);
	});
	for (a in nodes) {
		const type = nodes[a]['type'];
		count[type]++;
	}
	createPie();
};

function createPie() {
	// Data for the pie chart
	const data = [
		{label: 'UK Government', value: count['uk-government'], colour: '#012169'},
		{label: 'UK Companies', value: count['uk-company'], colour: '#157F1F'},
		{label: 'Foreign Governments', value: count['foreign-government'], colour: '#A63D40'},
		{label: 'Foreign Companies', value: count['foreign-company'], colour: '#FF9505'},
		{label: 'Train Services', value: count['train-service'], colour: '#5CC8FF'}
	];

	// Dimensions for the pie chart
	const pieWidth = 250;
	const pieHeight = 300;
	const radius = Math.min(pieWidth, pieHeight) / 2;

	// Colors for the pie slices
	const colors = ['#f44336', '#2196f3', '#4caf50'];

	// Create the SVG container
	const pieSvg = d3
		.select('#pie')
		.append('svg')
		.attr('width', pieWidth)
		.attr('height', pieHeight)
		.append('g')
		.attr('transform', `translate(${pieWidth / 2}, ${pieHeight / 2})`);

	// Create a pie layout
	const pie = d3
		.pie()
		.value((d) => d.value)
		.sort(null);

	// Generate the arc data
	const arc = d3.arc().innerRadius(50).outerRadius(radius);

	// Create the pie slices
	const slices = pieSvg
		.selectAll('path')
		.data(pie(data))
		.enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', (d) => d.data.colour);

	// Add labels to the pie slices
	const labels = pieSvg
		.selectAll('text')
		.data(pie(data))
		.enter()
		.append('text')
		.attr('transform', (d) => `translate(${arc.centroid(d)})`)
		.attr('text-anchor', 'middle')
		.style('fill', (d) => {
			if (d.data.colour === '#012169' || d.data.colour === '#A63D40' || d.data.colour === '#157F1F') {
				return 'white';
			} else {
				return 'black';
			}
		})
		.style('font-size', (d) => getFontSize(d))
		.text((d) => d.data.value);

	// Function to calculate the font size dynamically based on slice size
	function getFontSize(d) {
		const fontSize = Math.min((2 * radius * d.data.value) / 100, 20);
		return `${fontSize}px`;
	}
}

// Specify the dimensions of the chart.
const height = window.innerHeight;
const width = window.innerWidth - 300;

// Specify the color scale.
const colorScale = d3
	.scaleOrdinal()
	.domain(['uk-company', 'uk-government', 'foreign-government', 'foreign-company', 'train-service']) // Add your types here
	.range(['#157F1F', '#012169', '#A63D40', '#FF9505', '5CC8FF']); // Add corresponding colors

// The force simulation mutates links and nodes, so create a copy
// so that re-evaluating this cell produces the same result.
const linksN = links.map((d) => ({...d}));
const nodesN = nodes.map((d) => ({...d}));

// Create a simulation with several forces.
const simulation = d3
	.forceSimulation(nodesN)
	.force(
		'link',
		d3.forceLink(linksN).id((d) => d.id)
	)
	.force('charge', d3.forceManyBody().strength(-350)) // Increase the repulsion strength
	.force('x', d3.forceX(width / 2).strength(0.15)) // Increase the x-positioning strength
	.force('y', d3.forceY(height / 2).strength(0.2)) // Increase the y-positioning strength
	.force(
		'center',
		d3.forceRadial(Math.min(width, height) * 0.4, width / 2, height / 2) // Set a radial force to distribute nodes
	);

// Create the SVG container.
const svg = d3.select('body').append('svg').attr('width', width).attr('height', height).append('g');

// Add a line for each link, and a circle for each node.
const link = svg
	.append('g')
	.attr('stroke', '#999')
	.attr('stroke-opacity', 0.6)
	.selectAll('line')
	.data(linksN)
	.enter()
	.append('line')
	.attr('stroke-width', (d) => Math.sqrt(d.value));

const node = svg
	.append('g')
	.attr('stroke', '#fff')
	.attr('stroke-width', 1.5)
	.selectAll('circle')
	.data(nodesN)
	.enter()
	.append('circle')
	.attr('r', (d) => {
		if (d.type === 'train-service') {
			return 5;
		} else if (d.type === 'uk-government' || d.type === 'foreign-government') {
			return 10;
		} else {
			return 7.5;
		}
	})
	.style('fill', (d) => colorScale(d.type))
	.attr('class', 'node')
	.call(drag(simulation));

const label = svg
	.selectAll('.label')
	.data(nodesN)
	.enter()
	.append('text')
	.attr('class', 'label')
	.attr('dy', 4)
	.text((d) => d.id);

// Set the position attributes of links and nodes each time the simulation ticks.
simulation.on('tick', tick);

function drag(simulation) {
	function dragstarted(event, d) {
		if (!event.active) simulation.alphaTarget(0.3).restart();

		// Add fading effect to other nodes, links, and labels
		node.style('opacity', (n) => {
			const isConnected =
				n === d || linksN.some((l) => (l.source === d && l.target === n) || (l.source === n && l.target === d));
			return isConnected ? 1 : 0.2;
		});

		link.style('opacity', (l) => {
			const isConnected =
				l.source === d || l.target === d || isDirectlyConnected(l.source, d, 1) || isDirectlyConnected(l.target, d, 1);
			return isConnected ? 1 : 0.2;
		});

		label.style('opacity', (l) => {
			const isConnected =
				l === d ||
				linksN.some((lnk) => (lnk.source === d && lnk.target === l) || (lnk.source === l && lnk.target === d));
			return isConnected ? 1 : 0.2;
		});

		d.fx = d.x;
		d.fy = d.y;
	}

	function dragended(event, d) {
		if (!event.active) simulation.alphaTarget(0);
		node.style('opacity', 1);
		link.style('opacity', 1);
		label.style('opacity', 1);
		d.fx = null;
		d.fy = null;
	}

	// Update the subject (dragged node) position during drag.
	function dragged(event, d) {
		d.fx = event.x;
		d.fy = event.y;
	}
	return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
}

function tick() {
	link
		.attr('x1', (d) => Math.max(0, Math.min(width, d.source.x)))
		.attr('y1', (d) => Math.max(0, Math.min(height, d.source.y)))
		.attr('x2', (d) => Math.max(0, Math.min(width, d.target.x)))
		.attr('y2', (d) => Math.max(0, Math.min(height, d.target.y)));

	node
		.attr('cx', (d) => (d.x = Math.max(10, Math.min(width - 10, d.x)))) // Bounce off the horizontal edges
		.attr('cy', (d) => (d.y = Math.max(10, Math.min(height - 10, d.y)))); // Bounce off the vertical edges;

	label.attr('x', (d) => d.x + 15).attr('y', (d) => d.y);
}

function isDirectlyConnected(node1, node2, distance) {
	return linksN.some(
		(l) =>
			(l.source === node1 && l.target === node2 && l.distance <= distance) ||
			(l.source === node2 && l.target === node1 && l.distance <= distance)
	);
}

function handleGroupHover(event) {
	const hoveredGroup = event.target;
	const groupId = hoveredGroup.getAttribute('class').split(' ')[1]; // Extract the group ID from class attribute

	// Fade out nodes that are not in the hovered category
	node.style('opacity', (d) => {
		return d.type === groupId ? 1 : 0.2;
	});

	// Fade out links that are not connected to nodes in the hovered category
	link.style('opacity', (l) => {
		return l.source.type === groupId || l.target.type === groupId ? 1 : 0.2;
	});

	// Fade out labels that are not connected to nodes in the hovered category
	label.style('opacity', (l) => {
		return l.type === groupId ? 1 : 0.2;
	});
}

function handleGroupHoverOut() {
	// Restore the opacity of all nodes, links, and labels
	node.style('opacity', 1);
	link.style('opacity', 1);
	label.style('opacity', 1);
}
