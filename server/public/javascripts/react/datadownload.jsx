class DataDownload extends React.Component {
  constructor(props) {
    super(props);
    this.fullData = React.createRef();
    this.selectAll = this.selectAll.bind(this);
  }

  selectAll() {
    const node = this.fullData.current;

    if (document.body.createTextRange) {
      const range = document.body.createTextRange();
      range.moveToElementText(node);
      range.select();
    } else if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  render() {
    const { data, isActive, toggleModal } = this.props;
    return <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className='modal-background'></div>
      <div className='modal-content'>
        <div className='box'>
          <a className='button is-small is-outlined is-dark' onClick={this.selectAll}>
            <span className='icon'>
              <i className='fa fa-mouse-pointer'></i>
              </span>
            <span>Select All</span>
          </a>
          &nbsp;
          Full data:
          <br /><br />
          <pre ref={this.fullData}>
            {data}
          </pre>
        </div>
      </div>
      <button className='modal-close is-large' onClick={toggleModal}></button>
    </div>;
  }
}
