class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentVisibility: false,
      precept: '',
      preceptActive: false,
      preserve: false,
    };
    this.toggleStudentVisibility = this.toggleStudentVisibility.bind(this);
    this.togglePrecept = this.togglePrecept.bind(this);
    this.onChangePrecept = this.onChangePrecept.bind(this);
    this.onChangePreserve = this.onChangePreserve.bind(this);
    this.sendPrecept = this.sendPrecept.bind(this);
  }

  toggleStudentVisibility() {
    this.setState(({ studentVisibility }) => ({ studentVisibility: !studentVisibility }));
  }
  
  togglePrecept() {
    this.setState(({ preceptActive }) => ({ preceptActive: !preceptActive }));
  }

  onChangePrecept(e) {
    this.setState({ precept: e.target.value });
  }

  onChangePreserve(e) {
    this.setState({ preserve: e.target.checked });
  }

  sendPrecept(f) {
    this.togglePrecept();
    f.preventDefault();
    const { precept, preserve } = this.state;
    this.props.assignPrecept(precept, preserve);
    this.setState({ precept: '' });
  }

  render() {
    const { sort, entries, updateSort } = this.props;
    const { studentVisibility, preceptActive } = this.state;
    const columns = [
      ['Section', 'section'],
      ['Student ID', 'student_id'],
      ['Score', 'score'],
      ['Precept', 'precept'],
      ['Date', 'date'],
      ['TA', 'ta'],
      ['Flags', 'flags'],
    ];
    return <table className='table is-hoverable is-fullwidth'>
      <thead>
        <tr>
        {columns.map(([title, name]) => (
          <th key={name}>
            {name === 'precept' &&
              <div className={`dropdown ${preceptActive ? 'is-active' : ''}`}>
                <div className='dropdown-trigger'>
                  <a className='tooltip' data-tooltip='Assign precept' onClick={this.togglePrecept}>
                    <span className='icon has-text-info'>
                      <i className='fas fa-pencil-alt'></i>
                    </span>
                  </a>
                </div>
                <div className='dropdown-menu' role='menu'>
                  <div className='dropdown-content'>
                    <div className='dropdown-item'>
                      <form onSubmit={this.sendPrecept}>
                        <div className='field'>
                          <div className='control'>
                            <input className='input is-small' type='text' placeholder='Example: quacks precept' onChange={this.onChangePrecept} />
                          </div>
                        </div>
                        <div className='field'>
                          <label className='checkbox'>
                            <input type='checkbox' onChange={this.onChangePreserve} />
                            &nbsp;
                            Preserve existing precept designations
                          </label>
                        </div>
                        <div className='field'>
                          <div className='control'>
                            <button type='submit' className='button is-info is-small'>
                              <span className='icon'>
                                <i className='fa fa-flask'></i>
                                </span>
                              <span>Submit</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            }
            <span onClick={() => updateSort(name)}>
              {title}
              {sort[name] &&
                <span className='icon'>
                  <i className={`fas fa-caret-${sort[name] > 0 ? 'down' : 'up'}`}></i>
                </span>
              }
            </span>
            {name === 'student_id' &&
              <a className='tooltip' data-tooltip='Toggle visibility' onClick={this.toggleStudentVisibility}>
                <span className='icon has-text-info'>
                  <i className={`fas fa-${studentVisibility ? 'eye-slash' : 'eye'}`}></i>
                </span>
              </a>
            }
          </th>
        ))}
        </tr>
      </thead>
      <tbody>
        {entries.map(entry => (
          <DataRow showStudent={studentVisibility} key={entry._id} {...entry} />
        ))}
      </tbody>
    </table>;
  }
}
