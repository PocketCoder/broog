const nodes = [
	{id: 'Amey plc', label: 'Amey plc', type: 'uk-company'},
	{id: 'Arriva', label: 'Arriva', type: 'uk-company'},
	{id: 'Arriva Rail London', label: 'Arriva Rail London', type: 'uk-company'},
	{id: 'Arriva UK Trains', label: 'Arriva UK Trains', type: 'uk-company'},
	{id: 'Australian Retirement Trust', label: 'Australian Retirement Trust', type: 'foreign-company'},
	{id: 'Avanti West Coast', label: 'Avanti West Coast', type: 'train-service'},
	{id: 'Belgian Government', label: 'Belgian Government', type: 'foreign-government'},
	{id: 'Berkshire Hathaway Inc.', label: 'Berkshire Hathaway Inc.', type: 'foreign-company'},
	{id: 'British Government', label: 'British Government', type: 'uk-government'},
	{id: 'Buckthorn Partners LLp', label: 'Buckthorn Partners LLp', type: 'uk-company'},
	{
		id: 'Caisse de dépôt et placement du Québec',
		label: 'Caisse de dépôt et placement du Québec',
		type: 'foreign-company'
	},
	{id: 'Caledonian Sleeper', label: 'Caledonian Sleeper', type: 'train-service'},
	{id: 'c2c', label: 'c2c', type: 'train-service'},
	{id: 'Chiltern Railways', label: 'Chiltern Railways', type: 'train-service'},
	{id: 'China Investment Corporation', label: 'China Investment Corporation', type: 'foreign-company'},
	{id: 'Chinese Government', label: 'Chinese Government', type: 'foreign-government'},
	{id: 'CrossCountry', label: 'CrossCountry', type: 'train-service'},
	{id: 'DfT OLR Holdings', label: 'DfT OLR Holdings', type: 'uk-company'},
	{id: 'Department for Transport', label: 'Department for Transport', type: 'uk-government'},
	{id: 'Deutsche Bahn', label: 'Deutsche Bahn', type: 'foreign-company'},
	{id: 'DLR', label: 'DLR', type: 'train-service'},
	{id: 'East Midlands Railway', label: 'East Midlands Railway', type: 'train-service'},
	{id: 'Elizabeth Line', label: 'Elizabeth Line', type: 'train-service'},
	{id: 'Eurostar', label: 'Eurostar', type: 'train-service'},
	{id: 'Eurostar Group', label: 'Eurostar Group', type: 'foreign-company'},
	{id: 'Eurostar International Limited', label: 'Eurostar International Limited', type: 'uk-company'},
	{id: 'FGP Topco Limited', label: 'FGP Topco Limited', type: 'uk-company'},
	{id: 'Federated Hermes', label: 'Federated Hermes', type: 'foreign-company'},
	{id: 'Ferrovial S.A.', label: 'Ferrovial S.A.', type: 'foreign-company'},
	{id: 'Ferrovie dello Stato Italiane', label: 'Ferrovie dello Stato Italiane', type: 'foreign-company'},
	{id: 'FirstGroup', label: 'FirstGroup', type: 'uk-company'},
	{id: 'French Government', label: 'French Government', type: 'foreign-government'},
	{id: 'Gatwick Express', label: 'Gatwick Express', type: 'train-service'},
	{id: 'German Government', label: 'German Government', type: 'foreign-government'},
	{id: 'GIC', label: 'GIC', type: 'foreign-company'},
	{id: 'Go-Ahead Group', label: 'Go-Ahead Group', type: 'uk-company'},
	{id: 'Government of Singapore', label: 'Government of Singapore', type: 'foreign-government'},
	{id: 'Govia', label: 'Govia', type: 'uk-company'},
	{id: 'Govia Thameslink Railway', label: 'Govia Thameslink Railway', type: 'uk-company'},
	{id: 'Grand Central', label: 'Grand Central', type: 'train-service'},
	{id: 'Greater London Authority', label: 'Greater London Authority', type: 'uk-government'},
	{id: 'Great Northern', label: 'Great Northern', type: 'train-service'},
	{id: 'Great Western Railway', label: 'Great Western Railway', type: 'train-service'},
	{id: 'Greater Anglia', label: 'Greater Anglia', type: 'train-service'},
	{id: 'Heathrow Airport Holdings', label: 'Heathrow Airport Holdings', type: 'uk-company'},
	{id: 'Heathrow Express', label: 'Heathrow Express', type: 'train-service'},
	{id: 'Hong Kong Government', label: 'Hong Kong Government', type: 'foreign-government'},
	{id: 'Hull Trains', label: 'Hull Trains', type: 'train-service'},
	{id: 'Italian Government', label: 'Italian Government', type: 'foreign-government'},
	{id: 'Island Line', label: 'Island Line', type: 'train-service'},
	{id: 'JPMorgan Chase', label: 'JPMorgan Chase', type: 'foreign-company'},
	{id: 'JR East', label: 'Japenese Railways East', type: 'foreign-company'},
	{id: 'Keolis', label: 'Keolis', type: 'foreign-company'},
	{id: 'KeolisAmey Docklands Limited', label: 'KeolisAmey Docklands Limited', type: 'uk-company'},
	{id: 'London North Eastern Railway', label: 'London North Eastern Railway', type: 'uk-company'},
	{id: 'London Overground', label: 'London Overground', type: 'train-service'},
	{id: 'London Tramlink', label: 'London Tramlink', type: 'train-service'},
	{id: 'London Underground', label: 'London Underground', type: 'train-service'},
	{id: 'Lumo', label: 'Lumo', type: 'train-service'},
	{id: 'Merseyrail', label: 'Merseyrail', type: 'train-service'},
	{id: 'MTR Corporation', label: 'MTR Corporation', type: 'foreign-company'},
	{id: 'MTR Corporation (Crossrail) Ltd', label: 'MTR Corporation (Crossrail) Ltd', type: 'uk-company'},
	{id: 'Mitsui & Co.', label: 'Mitsui & Co.', type: 'foreign-company'},
	{id: 'Mitsui Group', label: 'Mitsui Group', type: 'foreign-company'},
	{id: 'National Railway Company of Belgium', label: 'National Railway Company of Belgium', type: 'foreign-government'},
	{id: 'Northern Trains', label: 'Northern Trains', type: 'train-service'},
	{id: 'One Equity Partners', label: 'One Equity Partners', type: 'foreign-company'},
	{id: 'Qatar Investment Authority', label: 'Qatar Investment Authority', type: 'foreign-company'},
	{id: 'ScotRail', label: 'ScotRail', type: 'train-service'},
	{id: 'Scottish Government', label: 'Scottish Government', type: 'uk-government'},
	{id: 'Scottish Rail Holdings', label: 'Scottish Rail Holdings', type: 'uk-company'},
	{id: 'Serco', label: 'Serco', type: 'uk-company'},
	{id: 'Serco-Abellio', label: 'Serco-Abellio', type: 'uk-company'},
	{id: 'SNCF', label: 'SNCF', type: 'foreign-company'},
	{id: 'SNCF Voyageurs', label: 'SNCF Voyageurs', type: 'foreign-company'},
	{id: 'South Western Railway', label: 'South Western Railway', type: 'train-service'},
	{id: 'Southern', label: 'Southern', type: 'train-service'},
	{id: 'Southeastern', label: 'Southeastern', type: 'train-service'},
	{id: 'Stansted Express', label: 'Stansted Express', type: 'train-service'},
	{id: 'State of Quatar', label: 'State of Quatar', type: 'foreign-government'},
	{id: 'Thameslink', label: 'Thameslink', type: 'train-service'},
	{id: 'TransPennine Express', label: 'TransPennine Express', type: 'train-service'},
	{id: 'Transport Scotland', label: 'Transport Scotland', type: 'uk-government'},
	{id: 'Transport UK Group', label: 'Transport UK Group', type: 'uk-company'},
	{id: 'Transport for London', label: 'Transport for London', type: 'uk-company'},
	{id: 'Tram Operations Ltd', label: 'Tram Operations Ltd', type: 'uk-company'},
	{id: 'Trenitalia', label: 'Trenitalia', type: 'foreign-company'},
	{
		id: 'Universities Superannuation Scheme (USS)',
		label: 'Universities Superannuation Scheme (USS)',
		type: 'uk-company'
	},
	{id: 'West Midlands Trains', label: 'West Midlands Trains', type: 'train-service'}
];

const links = [
	{source: 'Ferrovial S.A.', target: 'FGP Topco Limited'},
	{source: 'Qatar Investment Authority', target: 'FGP Topco Limited'},
	{source: 'State of Quatar', target: 'Qatar Investment Authority'},
	{source: 'GIC', target: 'FGP Topco Limited'},
	{source: 'Government of Singapore', target: 'GIC'},
	{source: 'Australian Retirement Trust', target: 'FGP Topco Limited'},
	{source: 'China Investment Corporation', target: 'FGP Topco Limited'},
	{source: 'Chinese Government', target: 'China Investment Corporation'},
	{source: 'Universities Superannuation Scheme (USS)', target: 'FGP Topco Limited'},
	// Break
	{source: 'German Government', target: 'Deutsche Bahn'},
	{source: 'Deutsche Bahn', target: 'Arriva'},
	{source: 'Arriva', target: 'Arriva UK Trains'},
	{source: 'Arriva UK Trains', target: 'Arriva Rail London'},
	{source: 'Arriva Rail London', target: 'London Overground'},
	{source: 'Arriva UK Trains', target: 'Chiltern Railways'},
	{source: 'Arriva UK Trains', target: 'CrossCountry'},
	{source: 'Arriva UK Trains', target: 'Grand Central'},
	// Break
	{source: 'FirstGroup', target: 'Lumo'},
	{source: 'FirstGroup', target: 'Avanti West Coast'},
	{source: 'FirstGroup', target: 'Great Western Railway'},
	{source: 'FirstGroup', target: 'Hull Trains'},
	{source: 'FirstGroup', target: 'Tram Operations Ltd'},
	{source: 'FirstGroup', target: 'South Western Railway'},
	{source: 'South Western Railway', target: 'Island Line'},
	// Break
	{source: 'Hong Kong Government', target: 'MTR Corporation'},
	{source: 'MTR Corporation', target: 'MTR Corporation (Crossrail) Ltd'},
	{source: 'MTR Corporation (Crossrail) Ltd', target: 'Elizabeth Line'},
	{source: 'MTR Corporation', target: 'South Western Railway'},
	// Break
	{source: 'Tram Operations Ltd', target: 'London Tramlink'},
	{source: 'Transport for London', target: 'London Tramlink'},
	{source: 'Transport for London', target: 'London Underground'},
	{source: 'Transport for London', target: 'London Overground'},
	{source: 'Transport for London', target: 'Elizabeth Line'},
	{source: 'Transport for London', target: 'DLR'},
	{source: 'Greater London Authority', target: 'Transport for London'},
	// Break
	{source: 'Italian Government', target: 'Ferrovie dello Stato Italiane'},
	{source: 'Ferrovie dello Stato Italiane', target: 'Trenitalia'},
	{source: 'Trenitalia', target: 'Avanti West Coast'},
	{source: 'Trenitalia', target: 'c2c'},
	// Break
	{source: 'Serco', target: 'Serco-Abellio'},
	// BReak
	{source: 'Serco-Abellio', target: 'Merseyrail'},
	// Break
	{source: 'Transport UK Group', target: 'Serco-Abellio'},
	{source: 'Transport UK Group', target: 'East Midlands Railway'},
	{source: 'Transport UK Group', target: 'West Midlands Trains'},
	{source: 'Transport UK Group', target: 'Greater Anglia'},
	{source: 'Greater Anglia', target: 'Stansted Express'},
	// Break
	{source: 'Mitsui Group', target: 'Mitsui & Co.'},
	{source: 'Berkshire Hathaway Inc.', target: 'Mitsui & Co.'},
	{source: 'Mitsui & Co.', target: 'Greater Anglia'},
	{source: 'Mitsui & Co.', target: 'West Midlands Trains'},
	// Break
	{source: 'JR East', target: 'West Midlands Trains'},
	// Break
	{source: 'Scottish Government', target: 'Scottish Rail Holdings'},
	{source: 'Scottish Government', target: 'Transport Scotland'},
	{source: 'Scottish Rail Holdings', target: 'ScotRail'},
	{source: 'Scottish Rail Holdings', target: 'ScotRail'},
	// Break
	{source: 'Transport Scotland', target: 'Caledonian Sleeper'},
	// Break
	{source: 'Eurostar Group', target: 'Eurostar International Limited'},
	{source: 'Eurostar International Limited', target: 'Eurostar'},
	// Break
	{source: 'French Government', target: 'SNCF'},
	{source: 'SNCF', target: 'SNCF Voyageurs'},
	{source: 'SNCF Voyageurs', target: 'Eurostar Group'},
	{source: 'SNCF', target: 'Keolis'},
	// Break
	{source: 'Buckthorn Partners LLp', target: 'Amey plc'},
	{source: 'JPMorgan Chase', target: 'One Equity Partners'},
	{source: 'One Equity Partners', target: 'Amey plc'},
	// Break
	{source: 'Keolis', target: 'KeolisAmey Docklands Limited'},
	{source: 'Amey plc', target: 'KeolisAmey Docklands Limited'},
	{source: 'KeolisAmey Docklands Limited', target: 'DLR'},
	// Break
	{source: 'Caisse de dépôt et placement du Québec', target: 'Keolis'},
	// Break
	{source: 'Belgian Government', target: 'National Railway Company of Belgium'},
	{source: 'National Railway Company of Belgium', target: 'Eurostar Group'},
	// Break
	{source: 'Federated Hermes', target: 'Eurostar Group'},
	// Break
	{source: 'Go-Ahead Group', target: 'Govia'},
	{source: 'Keolis', target: 'Govia'},
	{source: 'Govia', target: 'Govia Thameslink Railway'},
	{source: 'Govia Thameslink Railway', target: 'Thameslink'},
	{source: 'Govia Thameslink Railway', target: 'Great Northern'},
	{source: 'Govia Thameslink Railway', target: 'Southern'},
	{source: 'Govia Thameslink Railway', target: 'Gatwick Express'},
	// Break
	{source: 'British Government', target: 'Department for Transport'},
	{source: 'British Government', target: 'Greater London Authority'},
	{source: 'Department for Transport', target: 'DfT OLR Holdings'},
	{source: 'DfT OLR Holdings', target: 'Southeastern'},
	{source: 'DfT OLR Holdings', target: 'London North Eastern Railway'},
	{source: 'DfT OLR Holdings', target: 'Northern Trains'},
	{source: 'DfT OLR Holdings', target: 'TransPennine Express'},
	// Break
	{source: 'Great Western Railway', target: 'Heathrow Express'},
	{source: 'Heathrow Airport Holdings', target: 'Heathrow Express'},
	{source: 'FGP Topco Limited', target: 'Heathrow Airport Holdings'}
];

// Create a map to store the hierarchy levels of each node
const nodeLevels = new Map();

// Recursive function to calculate the hierarchy level of a node
function calculateLevel(nodeId) {
	// Check if the node's level has already been calculated
	if (nodeLevels.has(nodeId)) {
		return nodeLevels.get(nodeId);
	}

	// Find all links where the current node is the target
	const targetLinks = links.filter((link) => link.target === nodeId);

	// If no links found, it's a node without owners (level 1)
	if (targetLinks.length === 0) {
		nodeLevels.set(nodeId, 1);
		return 1;
	}

	// Calculate the level of each owner node recursively
	const ownerLevels = targetLinks.map((link) => calculateLevel(link.source));

	// The current node's level is the maximum level of its owners plus 1
	const level = Math.max(...ownerLevels) + 1;
	nodeLevels.set(nodeId, level);
	return level;
}

// Calculate the level for each node
nodes.forEach((node) => calculateLevel(node.id));

// Create the new array with id and level objects
const output = nodes.map((node) => ({
	id: node.id,
	level: nodeLevels.get(node.id)
}));

console.log(output);
