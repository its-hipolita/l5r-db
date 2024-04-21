// XMLDataService.js
const XMLDataService = {
    fetchXMLData: async () => {
      try {
        const response = await fetch('/db/database.xml'); // Adjust the URL or path to your XML data
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        return xmlDoc;
      } catch (error) {
        console.error('Error fetching XML data:', error);
        return null;
      }
    }
  };
  
  export default XMLDataService;
  