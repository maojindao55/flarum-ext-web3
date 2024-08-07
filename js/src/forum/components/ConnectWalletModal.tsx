import type Mithril from 'mithril';
import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';
import PolkadotConnectWalletModal from './PolkadotConnectWalletModal';
import EvmConnectWalletModal from './EvmConnectWalletModal';

export interface IConnectWalletModalAttrs extends IInternalModalAttrs {
  username: string;
  onattach?: (address: string, signature: string, source: string, type: string) => void;
  onclose: Function;
}

type WalletTypeName = 'evm' | 'polkadot';

const nameToComponent: Record<WalletTypeName, ComponentClass> = {
  evm: EvmConnectWalletModal,
  polkadot: PolkadotConnectWalletModal,
};

export default class ConnectWalletModal<CustomAttrs extends IConnectWalletModalAttrs = IConnectWalletModalAttrs> extends Modal<CustomAttrs> {
  private current: WalletTypeName | null = null;

  hide() {
    this.attrs.onclose();
    super.hide();
  }

  className(): string {
    return 'ConnectWalletModal';
  }

  title(): Mithril.Children {
    return app.translator.trans('maojindao55-web3.forum.connect-wallet-modal.title');
  }

  content(): Mithril.Children {
    if (this.current || (this.current = "evm")) {
      const ComponentName = nameToComponent[this.current];

      return (
        <div className="Modal-body">
          <div className="Form--centered" key={1}>
            <Button
              className="Button Button--text Button--block WalletAccounts-goback"
              icon="fas fa-arrow-left"
              onclick={() => (this.current = null)}
            >
              {app.translator.trans('maojindao55-web3.forum.connect-wallet-modal.goback')}
            </Button>
          </div>
          <ComponentName onerror={this.onerror.bind(this)} {...this.attrs} key={this.current} />
        </div>
      );
    }

    return <div className="Modal-body">{this.selectionView()}</div>;
  }

  selectionView() {
    return (
      <div className="Form Form--centered">
        <div className="Form-group">
          <Button className="Button maojindao55-web3-Button--polkadot Button--block" onclick={() => (this.current = 'polkadot')}>
            {app.translator.trans('maojindao55-web3.forum.connect-wallet-modal.polkadot-wallets')}
          </Button>
          <Button className="Button maojindao55-web3-Button--evm Button--block" onclick={() => (this.current = 'evm')}>
            {app.translator.trans('maojindao55-web3.forum.connect-wallet-modal.evm-wallets')}
          </Button>
        </div>
      </div>
    );
  }
}
