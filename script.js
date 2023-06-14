// TODO: Add colour for companies that directly operate trains (e.g. Southeastern)

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

const height = window.innerHeight;
const width = window.innerWidth - 300;
const svg = d3.select('body').append('svg').attr('width', width).attr('height', height).append('g');

// Create an array of colors for different levels
const colorScale = d3
	.scaleOrdinal()
	.domain(['uk-company', 'uk-government', 'foreign-government', 'foreign-company', 'train-service']) // Add your types here
	.range(['#157F1F', '#012169', '#A63D40', '#FF9505', '5CC8FF']); // Add corresponding colors

// Create the D3 force simulation
const simulation = d3
	.forceSimulation(nodes)
	.force(
		'link',
		d3
			.forceLink(links)
			.id((d) => d.id)
			.distance((d) => 40)
	)
	.force('charge', d3.forceManyBody())
	.force('center', d3.forceCenter(width / 2, height / 2).strength(0.2)) // Reduce the force of centering
	.force('collision', d3.forceCollide().radius(10)) // Added collision force
	.on('tick', tick);

// Create the links
const link = svg.selectAll('.link').data(links).enter().append('line').attr('class', 'link');

// Create the nodes
const node = svg
	.selectAll('.node')
	.data(nodes)
	.enter()
	.append('circle')
	.attr('class', 'node')
	.attr('r', 10)
	.call(drag(simulation));

// Add labels to the nodes
const label = svg
	.selectAll('.label')
	.data(nodes)
	.enter()
	.append('text')
	.attr('class', 'label')
	.attr('dy', 4)
	.text((d) => d.label);

function tick() {
	link
		.attr('x1', (d) => Math.max(0, Math.min(width, d.source.x)))
		.attr('y1', (d) => Math.max(0, Math.min(height, d.source.y)))
		.attr('x2', (d) => Math.max(0, Math.min(width, d.target.x)))
		.attr('y2', (d) => Math.max(0, Math.min(height, d.target.y)))
		.style('stroke', (d) => colorScale(d.level)); // Assign color based on link level

	node
		.attr('cx', (d) => (d.x = Math.max(10, Math.min(width - 10, d.x)))) // Bounce off the horizontal edges
		.attr('cy', (d) => (d.y = Math.max(10, Math.min(height - 10, d.y)))) // Bounce off the vertical edges
		.style('fill', (d) => colorScale(d.type)) // Assign color based on node type
		.attr('r', (d) => {
			if (d.type === 'train-service') {
				return 5;
			} else if (d.type === 'uk-government' || d.type === 'foreign-government') {
				return 10;
			} else {
				return 7.5;
			}
		});

	label
		.attr('x', (d) => d.x + 15) // Adjust the x position for label placement
		.attr('y', (d) => d.y);
}

function drag(simulation) {
	function dragstarted(event, d) {
		if (!event.active) simulation.alphaTarget(0.3).restart();

		// Add fading effect to other nodes, links, and labels
		node.style('opacity', (n) => {
			const isConnected =
				n === d || links.some((l) => (l.source === d && l.target === n) || (l.source === n && l.target === d));
			return isConnected ? 1 : 0.2;
		});

		link.style('opacity', (l) => {
			const isConnected = l.source === d || l.target === d || (l.source === d && isDirectlyConnected(l.target, d, 2));
			return isConnected ? 1 : 0.2;
		});

		label.style('opacity', (l) => {
			const isConnected =
				l === d ||
				links.some((lnk) => (lnk.source === d && lnk.target === l) || (lnk.source === l && lnk.target === d));
			return isConnected ? 1 : 0.2;
		});

		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(event, d) {
		d.fx = event.x;
		d.fy = event.y;
	}

	function dragended(event, d) {
		if (!event.active) simulation.alphaTarget(0);

		// Remove fading effect from nodes, links, and labels
		node.style('opacity', 1);
		link.style('opacity', 1);
		label.style('opacity', 1);

		d.fx = null;
		d.fy = null;
	}

	return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
}

function isDirectlyConnected(node1, node2, maxDepth) {
	if (maxDepth === 0) return false;

	const directLinks = links.filter(
		(l) => (l.source === node1 && l.target === node2) || (l.source === node2 && l.target === node1)
	);
	if (directLinks.length > 0) return true;

	for (const link of links) {
		if (link.source === node1 && isDirectlyConnected(link.target, node2, maxDepth - 1)) {
			return true;
		}
		if (link.target === node1 && isDirectlyConnected(link.source, node2, maxDepth - 1)) {
			return true;
		}
	}

	return false;
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
