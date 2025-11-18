export function formatAnalysisText(text) {
  if (!text) return null;

  // Split by lines and process
  const lines = text.split('\n');
  const elements = [];
  let currentList = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      if (currentList.length > 0) {
        elements.push({
          type: 'list',
          items: currentList,
          key: `list-${idx}`,
        });
        currentList = [];
      }
      return;
    }

    // Headers (lines with **)
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      if (currentList.length > 0) {
        elements.push({
          type: 'list',
          items: currentList,
          key: `list-${idx}`,
        });
        currentList = [];
      }
      elements.push({
        type: 'header',
        content: trimmed.replace(/\*\*/g, ''),
        key: `header-${idx}`,
      });
      return;
    }

    // Subheaders (lines with ### or bold at start)
    if (trimmed.startsWith('###') || trimmed.startsWith('**')) {
      if (currentList.length > 0) {
        elements.push({
          type: 'list',
          items: currentList,
          key: `list-${idx}`,
        });
        currentList = [];
      }
      elements.push({
        type: 'subheader',
        content: trimmed.replace(/#+/g, '').replace(/\*\*/g, ''),
        key: `subheader-${idx}`,
      });
      return;
    }

    // List items (starting with *)
    if (trimmed.startsWith('*')) {
      currentList.push(trimmed.replace(/^\*\s*/, '').replace(/\*\*/g, ''));
      return;
    }

    // Regular paragraphs
    if (currentList.length > 0) {
      elements.push({
        type: 'list',
        items: currentList,
        key: `list-${idx}`,
      });
      currentList = [];
    }
    elements.push({
      type: 'paragraph',
      content: trimmed,
      key: `para-${idx}`,
    });
  });

  // Flush remaining list
  if (currentList.length > 0) {
    elements.push({
      type: 'list',
      items: currentList,
      key: `list-final`,
    });
  }

  return elements;
}

export function renderFormattedContent(elements) {
  if (!elements) return null;

  const headerStyle = {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0056b3',
    marginTop: '16px',
    marginBottom: '10px',
  };

  const subheaderStyle = {
    fontSize: '14px',
    fontWeight: '700',
    color: '#333',
    marginTop: '12px',
    marginBottom: '8px',
  };

  const paragraphStyle = {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '10px',
  };

  const listStyle = {
    marginLeft: '20px',
    marginBottom: '12px',
  };

  const listItemStyle = {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '6px',
  };

  return elements.map((el) => {
    switch (el.type) {
      case 'header':
        return (
          <div key={el.key} style={headerStyle}>
            {el.content}
          </div>
        );
      case 'subheader':
        return (
          <div key={el.key} style={subheaderStyle}>
            {el.content}
          </div>
        );
      case 'paragraph':
        return (
          <div key={el.key} style={paragraphStyle}>
            {el.content}
          </div>
        );
      case 'list':
        return (
          <ul key={el.key} style={listStyle}>
            {el.items.map((item, i) => (
              <li key={`${el.key}-${i}`} style={listItemStyle}>
                {item}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  });
}
