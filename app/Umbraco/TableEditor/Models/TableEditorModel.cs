using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TableEditor.Models
{
    public class TableEditorModel
    {
        /*
        {
            useFirstRowAsHeader: false,
            useLastRowAsFooter: false,
            tableStyle: null,
            columnStylesSelected: [
               null,
               null
            ],
            cells: [
                [{ value: "" }, { value: "" }],
                [{ value: "" }, { value: "" }],
                [{ value: "" }, { value: "" }],
            ]
        }
        */

        public bool UseFirstRowAsHeader { get; set; }
        public bool UseLastRowAsFooter { get; set; }
        public string TableStyle { get; set; }
        public IEnumerable<string> ColumnStylesSelected { get; set; }
        public IEnumerable<string> RowStylesSelected { get; set; }
        public IEnumerable<IEnumerable<CellModel>> Cells { get; set; }
    }
}
