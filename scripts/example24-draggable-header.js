const React = require('react');
const ReactDataGrid = require('react-data-grid');
const exampleWrapper = require('../components/exampleWrapper');
const {
  DraggableHeader: { DraggableContainer }
} = require('react-data-grid-addons');

class Example extends React.Component {
  createRows = () => {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push(this.createRow(i) /*{
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      }*/);
    }

    return rows;
  };

  createRow = (rowIndex) => {
    const row = {};
    for (let i = 1; i < 100; i++) {
      row['id' + i] = rowIndex + '_' + i;
    }
    return row;
  };

  createColumns = () => {
    let columns = [];
    for (let i = 1; i < 100; i++) {
      columns.push(      {
        key: 'id' + i,
        name: 'ID' + i,
        width: 50,
        draggable: true
      });
    }
    return columns;
  };

  rowGetter = (i) => {
    return this.state.rows[i];
  };

  onHeaderDrop = (source, target) => {
    const stateCopy = Object.assign({}, this.state);
    const columnSourceIndex = this.state.columns.findIndex(
      i => i.key === source
    );
    const columnTargetIndex = this.state.columns.findIndex(
      i => i.key === target
    );

    stateCopy.columns.splice(
      columnTargetIndex,
      0,
      stateCopy.columns.splice(columnSourceIndex, 1)[0]
    );

    const emptyColumns = Object.assign({},this.state, { columns: [] });
    this.setState(
      emptyColumns
    );

    const reorderedColumns = Object.assign({},this.state, { columns: stateCopy.columns });
    this.setState(
      reorderedColumns
    );
  };

  state = {
    columns: this.createColumns(), /*[
      {
        key: 'id',
        name: 'ID',
        width: 50,
        draggable: true
      },
      {
        key: 'title',
        name: 'Title',
        draggable: true,
        resizable: true
      },
      {
        key: 'count',
        name: 'Count',
        draggable: true,
        resizable: true
      }
    ],*/
    rows: this.createRows()
  };

  render() {
    return (
      <DraggableContainer 
        onHeaderDrop={this.onHeaderDrop}>
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
        />
      </DraggableContainer>
    );
  }
}

module.exports = exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Drag Columns to Reorder',
  exampleDescription: 'Drag Columns to Reorder',
  examplePath: './scripts/example24-draggable-header.js'
  // examplePlaygroundLink: ''
});
