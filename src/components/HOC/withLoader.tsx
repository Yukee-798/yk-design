import React from 'react';
import axios from 'axios';

interface ILoaderState {
    data: any;
    isLoading: boolean;
    err: string;
}
interface ILoaderProps {
    data: any
}

const withLoader = <P extends ILoaderState>(WarppedComponent: React.ComponentType<P>, url: string) => {
    return class LoaderComponent extends React.Component<Partial<ILoaderProps>, ILoaderState> {
        state = {
            data: null,
            isLoading: true,
            err: ''
        }

        componentDidMount() {
            axios.get(url)
                 .then(value => {
                    this.setState({ data: value.data, isLoading: false })
                 })
                 .catch(reason => {
                    this.setState({ err:  reason.toString(), isLoading: false})
                 });
        }
        render() {
            const { data, isLoading, err } = this.state;
            return (
                <>
                    {
                        isLoading ? 'Loading...' : 
                        err ? err : <WarppedComponent {...this.props as P} data={data} />
                    }
                </>
            )
        }
    }
}

export default withLoader;