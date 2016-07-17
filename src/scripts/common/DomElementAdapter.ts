export class DomElementAdapter {

  public createDiv():HTMLDivElement {
    return document.createElement('div');
  }

  public createTableFromData(data:Array<Object>):HTMLTableElement {
    let table:HTMLTableElement = document.createElement('table');
    let tableHeader:HTMLElement = this.createTableHeaderFromData(data);
    let tableBody:HTMLElement = this.createTableBodyFromData(data);
    table.appendChild(tableHeader);
    table.appendChild(tableBody);

    return table;
  }

  private createTableHeaderFromData(data:Array<Object>):HTMLElement {
    let tableHeader:HTMLElement = document.createElement('thead');
    for (let label in data[0]) {
      let headerCell:HTMLElement = document.createElement('th');
      headerCell.innerText = label;
      tableHeader.appendChild(headerCell);
    }

    return tableHeader;
  }

  private createTableBodyFromData(data:Array<Object>):HTMLElement {
    let tableBody:HTMLElement = document.createElement('tbody');

    for (let row of data) {
      let tr:HTMLElement = this.createTableRowFromData(row);
      tableBody.appendChild(tr);
    }

    return tableBody;
  }

  private createTableRowFromData(data:Object):HTMLElement {
    let tableRow:HTMLElement = document.createElement('tr');
    for (let element in data) {
      let tableCell:HTMLElement = document.createElement('td');
      tableCell.innerText = data[element];
      tableRow.appendChild(tableCell);
    }
    return tableRow;
  }

}
